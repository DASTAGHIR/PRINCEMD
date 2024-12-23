let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if there are any users in the allowed list
    if (global.allowed.length === 0) {
        return conn.reply(m.chat, "No users are allowed to use the bot in DM.", m);
    }
    
    // Create a list of allowed users' usernames (or JIDs)
    let allowedList = global.allowed.map((jid) => `@${jid}`).join('\n');
    
    // Send the list of allowed users
    conn.reply(m.chat, `*The following users are allowed to use the bot in DM:*\n\n${allowedList}`, m, {
        mentions: global.allowed.map((jid) => jid + "@s.whatsapp.net") // Mention each user
    });
};

handler.help = ['allowedlist'];
handler.tags = ['owner'];
handler.command = ['allowedlist', 'alwlist', 'listallowed', 'allowlist', 'alist'];

handler.group = false;
handler.rowner = true;

export default handler;
