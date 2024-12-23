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
    
    // Check if the user is not in the allowed list
    if (!global.allowed.includes(who.split`@`[0])) throw 'The user mentioned is not allowed to use the bot in DM';

    // Remove the user from the allowed list
    global.allowed = global.allowed.filter(jid => jid !== who.split`@`[0]);
    
    // Send the confirmation reply
    conn.reply(m.chat, `@${who.split`@`[0]} has been removed from the list of users allowed to use the bot in DM`, m, { mentions: [who] });
};

handler.help = ['removeallow <@tag>'];
handler.tags = ['owner'];
handler.command = ['removeallow', 'delallow', 'removealw'];

handler.group = false;
handler.rowner = true;

export default handler;
