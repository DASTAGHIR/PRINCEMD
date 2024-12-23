import fg from 'api-dylux';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✨ *Enter a valid Google Drive link!* ✨`;
  m.react(rwait);

  try {
    let res = await fg.GDriveDl(args[0]);
    let fileName = res.fileName;
    let downloadUrl = res.downloadUrl;
    let fileSize = res.fileSize;
    let mimetype = res.mimetype;

    // Infer MIME type based on file extension if it's invalid or missing
    if (!mimetype || mimetype === 'application/octet-stream') {
      const extension = fileName.split('.').pop().toLowerCase();
      const mimeTypes = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        txt: 'text/plain',
        jpg: 'image/jpeg',
        png: 'image/png',
        zip: 'application/zip',
        rar: 'application/vnd.rar',
      };

      mimetype = mimeTypes[extension] || 'application/octet-stream'; // Default to BIN type if unknown
    }

    // Fancy reply with emojis and bold font
    await m.reply(`
🎯 *Google Drive File Details:*

📝 *File Name:*  *${fileName}*
📦 *File Size:*  *${fileSize}*
📂 *File Type:*  *${mimetype}*

⏬ _Sending your file now..._ ⏬
    `);

    // Send the file
    conn.sendMessage(m.chat, {
      document: { url: downloadUrl },
      fileName,
      mimetype,
    }, { quoted: m });

    m.react(done);

  } catch (e) {
    console.error(e);
    m.reply('⚠️ *Error:* Check the link or try another link!');
  }
};

handler.help = ['gdrive'];
handler.tags = ['downloader'];
handler.command = ['drive', 'gdrive'];
handler.credit = false;
handler.premium = false;

export default handler;
