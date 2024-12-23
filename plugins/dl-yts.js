import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) return m.reply(`✨ *What are you searching for?* Enter the name of the topic.\n📌 *Example:*\n*${usedPrefix + command}* Naat Shareef`);
m.react('🔍');
    
let result = await yts(text);
let ytres = result.videos;
if (!ytres.length) return m.reply('❌ *No results found.*');
    
let textoo = `🔍 *• Search Results for:*  *${text}*\n\n`;
for (let i = 0; i < Math.min(15, ytres.length); i++) { 
let v = ytres[i];
textoo += `🎵 *Title:* ${v.title}\n📆 *Published:* ${v.ago}\n👀 *Views:* ${v.views}\n⌛ *Duration:* ${v.timestamp}\n🔗 *Link:* ${v.url}\n\n⊱ ────── {.⋅ 🎶 ⋅.} ───── ⊰\n\n`;
}
await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', textoo, m, null);
};
handler.help = ['playlist', 'yts'];
handler.tags = ['downloader'];
handler.command = ['playvid2', 'playlist', 'playlista', 'yts', 'ytsearch'];
export default handler;
