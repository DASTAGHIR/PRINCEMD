let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let kickte = `✳️ Correct use of the command\n*${usedPrefix + command}* @tag\n\n*${usedPrefix + command}* for Remove + Delete Msg`;

    // Check if a user is mentioned or if a quoted message exists
    if (!m.mentionedJid[0] && !m.quoted) 
        return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

    try {
        // Attempt to delete the message (if supported by the platform)
        if (m.message.extendedTextMessage) {
            let delet = m.message.extendedTextMessage.contextInfo.participant;
            let bang = m.message.extendedTextMessage.contextInfo.stanzaId;
            await conn.sendMessage(m.chat, { 
                delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }
            });
        } else if (m.quoted) {
            await conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
        }
    } catch (e) {
        // Log errors to avoid breaking execution
        console.error("Error deleting message:", e);
    }

    // Remove the user from the group
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

    // Notify the group about the action
    m.reply(`✅ User has been removed and His message has been deleted. 👋🏻`);
};

handler.help = ['kick2 @user', 'kk @user'];
handler.tags = ['group'];
handler.command = ['kick2', 'expulsar32', 'k2', 'kk']; 
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
