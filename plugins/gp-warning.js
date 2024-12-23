let war = global.maxwarn;
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }
    if (!who) throw `⚠️ *Tag or mention someone!*\n\n💡 *Example:* ${usedPrefix + command} @user`;

    if (!(who in global.db.data.users)) throw `⚠️ *User not found in the database!*`;

    let name = conn.getName(m.sender);
    let warn = global.db.data.users[who].warn;

    if (warn < war) {
        global.db.data.users[who].warn += 1;

        m.reply(`
╔══════════════════╗
        🚨 *Warning Issued* 🚨
╚══════════════════╝

👮‍♂️ *Admin:* ${name}
👤 *User:* @${who.split`@`[0]}
⚠️ *Warns:* ${warn + 1}/${war}
📝 *Reason:* ${text || "No reason provided"}

📩 *Check your inbox for detailed warning information!*
`, null, { mentions: [who] });

        m.reply(`
⚠️ *Caution! ⚠️*
You have received a warning from the admin.

🔢 *Warns:* ${warn + 1}/${war}  
💀 If you receive *${war}* warnings, you will be removed from the group.
        `, who);
    } else if (warn == war) {
        global.db.data.users[who].warn = 0;

        m.reply(`
⛔ *Warning Limit Exceeded!*
The user has reached the maximum warning limit of *${war}*. They will now be removed from the group.
        `);

        await time(3000); // Wait for 3 seconds
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');

        m.reply(`
♻️ You were removed from the group *${groupMetadata.subject}* because you were warned *${war}* times.
        `, who);
    }
};

handler.help = ['warn @user'];
handler.tags = ['group'];
handler.command = ['warn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
