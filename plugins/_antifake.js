let handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
if (!m.isGroup) return !1;
let chat = global.db.data.chats[m.chat];
let bot = global.db.data.settings[conn.user.jid] || {};
    
if (isBotAdmin && chat.antifake && !isAdmin && !isOwner && !isROwner) {
const fkontak = {"key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" };

const prefijosProhibidos = process.env.ANTIFAKE_USERS.split(',');

const senderNumber = m.sender.split('@')[0]; 
if (prefijosProhibidos.some(prefijo => senderNumber.startsWith(prefijo))) {
let texto = `*@${senderNumber}* In this group antifake number is not allowed, you will be expelled...`;

try {
await conn.reply(m.chat, texto, fkontak, m);
let response = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
if (response[0].status === "404") return; 
} catch (error) {
console.error(`Error al expulsar a ${senderNumber}:`, error);
}}}
return !0;
};

export default handler;
