let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who;
    
    // Check if it's a group message and if there's a mention or quoted user
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    if (!who) throw `✳️ Tag or mention someone\n\n📌 Example: ${usedPrefix + command} @user`;
    
    let user = global.db.data.users[who];
    
    // Check if the user is already allowed
    if (global.allowed.includes(who.split`@`[0])) throw 'The user Mentioned is already allowed to use the bot in DM';

    // Add the user to the allowed list
    global.allowed.push(`${who.split`@`[0]}`);
    
    // Send the confirmation reply
    conn.reply(m.chat, `@${who.split`@`[0]} got the ultimate pass to use the bot in DM`, m, { mentions: [who] });
};

handler.help = ['allow <@tag>'];
handler.tags = ['owner'];
handler.command = ['allow', 'makeallow', 'alw'];

handler.group = false;
handler.rowner = true;

export default handler;
