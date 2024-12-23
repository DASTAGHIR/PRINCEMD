import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import express from 'express';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import { promises as fsPromises } from 'fs';

// Set up __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express HTTP server
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'lib/source')));

app.get('/', (req, res) => {
  res.redirect('/prince.html');
});

app.listen(port, () => {
  console.log(chalk.green(`🌐 Server is running on port ${port}`));
});

// Core bot startup logic
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('PRINCE\nMD', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta'],
});

say(`BY: DASTAGEER`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta'],
});

var isRunning = false;

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  const currentFilePath = new URL(import.meta.url).pathname;
  let args = [join(__dirname, file), ...process.argv.slice(2)];

  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  setupMaster({
    exec: args[0],
    args: args.slice(1),
  });

  let p = fork();

  p.on('message', (data) => {
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('⚠️ ERROR ⚠️ >> ', code);
  //  start('main.js'); //

    if (code === 0) return;
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
  const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
  const packageJsonPath = path.join(path.dirname(currentFilePath), './package.json');

  try {
    const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
    const packageJsonObj = JSON.parse(packageJsonData);
    const currentTime = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Karachi',
  dateStyle: 'full',
  timeStyle: 'long',
}).format(new Date()); //new Date().toLocaleString();

    let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
    console.log(
      chalk.yellow(`╭${lineM}
┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('┊')}${chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`)}
┊${chalk.blueBright('┊')}${chalk.yellow(`💾 Total RAM: ${ramInGB.toFixed(2)} GB`)}
┊${chalk.blueBright('┊')}${chalk.yellow(`💽 Free RAM: ${freeRamInGB.toFixed(2)} GB`)}
┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('┊')} ${chalk.blue.bold(`🟢INFORMATION:`)}
┊${chalk.blueBright('┊')} ${chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊${chalk.blueBright('┊')}${chalk.cyan(`💚 Name: ${packageJsonObj.name}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💫 Version: ${packageJsonObj.version}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💜 Description: ${packageJsonObj.description}`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`💎 Project Author: ${packageJsonObj.author.name} (Prince❣️)`)}
┊${chalk.blueBright('┊')}${chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊${chalk.blueBright('┊')}${chalk.cyan(`⏰ Current Time :`)}
┊${chalk.blueBright('┊')}${chalk.cyan(`${currentTime}`)}
┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
╰${lineM}`)
    );

    setInterval(() => {}, 1000);
  } catch (err) {
    console.error(chalk.red(`❌ Failed to read the package.json file: ${err}`));
  }

  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', (line) => {
      p.emit('message', line.trim());
    });
}

start('main.js');
