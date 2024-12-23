import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 
import dotenv from 'dotenv'


//💌------------------------------------------💌

//BETA: If you want to avoid typing the number that will be bot into the console, I added from here then:
//Only applies to option 2 (be a bot with an 8-digit text code)

global.botNumberCode = "" //Example: +923092668108
global.confirmCode = "" 


//💌------------------------------------------💌





//💌global.pairingNumber = "" //+9203644880949💌
global.mods = ['923092668108'] 
global.prems = ['923092668108']
global.allowed = ['923092668108']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = "GataDiosV2"
global.itsrose = ['4b146102c4d500809da9d1ff']
global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://deliriussapi-oficial.vercel.app'
global.openai_key = 'sk-...OzYy' eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FTSkg4N3VjYjhFdm9DTXZJQnRpdHM1Nkxtbmp4aDJVTHJSMEFEUktVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjBvSjZxOGxKcUdlV2E4aExjRWdhYVNrT1dBbDVSTU5vUzk2cnQ0WVV4MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTDhValEwUVQyL1ZyeFNQZXhNQTY0VTZVaGd5NzdHRWlmeHY5NzYrS21nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvcmNrT25PU2tqS2Jnc05oc3JiYnM3bEE1QXRJTlpTOVBCRGl6STJEQ1JBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9Ma3kxSC9jdHdoeTNtM2lWeS9sNkpqalVrVFh3eXBSQ1ViWkJzUlNhRWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpOR3J0WUNFSVhaR2crYTFQRzQ0Vkpmc2w0VU0yVlhlZU1nNGNaTDNwenM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFOU1VQMkhraE05QmxqNVJhRzdiUkplcytYRWlNeGRiUjNxUy8zL2hHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlRTNUduakNxcFpNRzk2MEZCekpOVEo5WUFzS0RzY25JYmxjZi9KSlRUQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZUdXhhYk81WndHU3U0MGQvQTRBRUc3TXZVMExvTXFySHU0Y2ROenUrRkxxWm9xMGh0ckxac1lXdXVFNjNLNU5zcXF1VWJheitSMlhiK1Z5Nytod2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJuYU9PQklWZzJpVlZDR1hrajF0Z0REdDZacTYxaWtaRzhSdXkvd1oycllVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJXQ0ozVFBYVyIsIm1lIjp7ImlkIjoiOTIzNjQ0ODgwOTQ5OjIzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNzA1MzIzODkxNzk0MDQ6MjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPMnRzczhGRU5LcnByc0dHQW9nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0K1VGd2V0T3doeHpUYXRiSXNRVTBwaTlOUWNPclZweWhJbmJYVXdsZUZJPSIsImFjY291bnRTaWduYXR1cmUiOiI0Tk5YMDB3WFU0dndqLzNlRTVNM3NsWUZmeS81eEhjejdFZzdPTGp1SXhoclJmTE9aOFNQT2h5cHIveGd4c1htTGxEOUNsanFXZGN1Umw4b28wWDRDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVStNSG42RmRFS0sya1BucFU1M2orUDQzS3F3WjA0Q1RJUnBtbmQ3RTN5TG9GRy9yaGt1UTF3aHdlbUt5cnlib25FLzIwQTdMOVphU0RiaVJGRTBQZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM2NDQ4ODA5NDk6MjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmZsQmNIclRzSWNjMDJyV3lMRUZOS1l2VFVIRHExYWNvU0oyMTFNSlhoUyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0OTcyODk3LCJsYXN0UHJvcEhhc2giOiIxUVltbyJ9
global.openai_org_id = 'HITjoN7H8pCwoncEB9e3fSyW'
//💌------------------------------------------💌



//💌------------------------------------------💌
//CONFIG VARS. Do not touch them⚠️

  global.vidcap = process.env.DL_MSG


//💌------------------------------------------💌

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	



//💌------------------------------------------💌
// APIS
global.APIs = {
  // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
// 💌------------------------------------------💌



//APIs keys
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
   'https://api.fgmods.xyz': 'm2XBbNvz',
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': `${keysxxx}`
   
}

//💌------------------------------------------💌



// Bot Images 
global.imagen1 = fs.readFileSync("./lib/source/menus/img1.jpg")
global.imagen2 = fs.readFileSync("./lib/source/menus/img2.jpg")
//💌------------------------------------------💌



global.imag1 = fs.readFileSync("./lib/source/prn.png")
global.imag2 = fs.readFileSync("./lib/source/prn1.png")
global.imag3 = fs.readFileSync("./lib/source/prn2.jpg")

global.pimg = [imag1, imag2, imag3]



// Randome
global.princeImg = [imagen1, imagen2]
//💌------------------------------------------💌



// Moderator 
//Change to false to use the Bot from the same number as the Bot.
global.isBaileysFail = false

global.developer = 'https://wa.me/message/DCAK67ON3XVOG1' //contact
//💌------------------------------------------💌



//Sticker WM
global.wm = process.env.BOT_NAME
global.botname = process.env.BOT_NAME
global.princebot = '🛡️𝘗𝘙𝘐𝘕𝘊𝘌-𝘉𝘖𝘛-𝘔𝘋🛡️'
global.packname = process.env.PACK_NAME
global.author = 'Prince♥️' 
global.princeig = 'https://www.instagram.com' 
global.princegp = 'https://whatsapp.com/channel/0029VaKNbWkKbYMLb61S1v11'
global.menuvid = 'https://i.imgur.com/GFAAXqw.mp4'
global.Princesc = 'https://github.com/PRINCE-GDS/THE-PRINCE-BOT' 
global.princeyt = 'https://youtube.com/'
global.Princelog = 'https://i.imgur.com/cUvIv5w.jpeg'
global.thumb = fs.readFileSync('./lib/source/Prince.png')
//💌------------------------------------------💌



//Reactions
global.wait = '*`⏰ 𝙷𝚘𝚕𝚍 𝙾𝚗 𝙿𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐...`*'
global.imgs = '*🖼️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 ɪᴍᴀɢᴇs 𝚆𝙰𝙸𝚃..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '♻️'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🌀' 
global.multiplier = 69 
global.maxwarn = '2' 
global.eror = '```404 error```'
//💌------------------------------------------💌


dotenv.config()

const ownervb = process.env.OWNER_NUMBER;
if (!ownervb){
   throw new Error("OWNER_NUMBER var env is not set please set it e.g 92644880949,Prince");
}

const ownerlist = ownervb.split(',');

global.owner = [];
for (let i = 0; i < ownerlist.length; i += 2) {
    const owner = [
        ownerlist[i],            
        ownerlist[i + 1],         
        true                        
    ];
    global.owner.push(owner);
}



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
