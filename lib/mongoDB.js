import mongoose from 'mongoose';

// Set strict query mode to false (optional based on Mongoose version)
mongoose.set('strictQuery', false);

// Destructure Mongoose utilities
const { Schema, connect, model: _model } = mongoose;

// Default options for MongoDB connection
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Improved MongoDB class
export class MongoDB {
  constructor(url, options = defaultOptions) {
    /**
     * @type {string} MongoDB connection URL
     */
    this.url = url;

    /**
     * @type {mongoose.ConnectOptions} Mongoose connection options
     */
    this.options = options;

    this.data = this._data = {};

    /**
     * @type {mongoose.Schema} Schema for MongoDB data
     */
    this._schema = {};

    /**
     * @type {mongoose.Model} MongoDB Model
     */
    this._model = {};

    /**
     * @type {Promise<typeof mongoose>} Connection promise
     */
    this.db = this.connectWithRetry();
  }

  /**
   * Connect to MongoDB with retry logic and error handling
   */
  async connectWithRetry() {
    let retries = 5; // Number of retry attempts
    const delay = 3000; // Delay between retries (in ms)

    while (retries > 0) {
      try {
        const db = await connect(this.url, { ...this.options });
        console.log('MongoDB connected✅');
        return db;
      } catch (err) {
        console.error(`MongoDB connection failed. Retries left: ${retries - 1}`, err.message);
        retries -= 1;
        if (retries === 0) {
          throw new Error('MongoDB connection failed after multiple attempts.');
        }
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Read data from MongoDB
   */
  async read() {
    this.conn = await this.db;

    // Define schema for the 'data' collection
    let schema = (this._schema = new Schema({
      data: {
        type: Object,
        required: true,
        default: {},
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d', // Optional: Automatically delete documents older than 30 days
      },
    }));

    try {
      this._model = _model('data', schema);
    } catch {
      this._model = _model('data');
    }

    // Attempt to retrieve the first document
    this._data = await this._model.findOne({});
    if (!this._data) {
      // If no document exists, create a new one
      this.data = {};
      const [_, _data] = await Promise.all([this.write(this.data), this._model.findOne({})]);
      this._data = _data;
    } else {
      this.data = this._data.data;
    }

    return this.data;
  }

  /**
   * Write data to MongoDB
   * @param {Object} data - The data to be written
   */
  async write(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data. Must be a non-empty object.');
    }

    try {
      if (!this._data) {
        // Create a new document if none exists
        const newData = new this._model({ data });
        const savedData = await newData.save();
        this._data = savedData;
      } else {
        // Update existing document
        const docs = await this._model.findById(this._data._id);
        if (!docs) {
          throw new Error('Document not found.');
        }
        docs.data = { ...docs.data, ...data }; // Merge with existing data
        const savedData = await docs.save();
        this._data = savedData;
      }

      this.data = this._data.data;
      return true;
    } catch (err) {
      console.error('Error writing to MongoDB:', err.message);
      throw err;
    }
  }
}
