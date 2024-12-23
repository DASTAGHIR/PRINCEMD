let handler = async (m, { conn, participants, usedPrefix, command }) => {

    let kickte = `✳️ Correct use of the command\n*${usedPrefix + command}* @tag\n\n*${usedPrefix + command}* for Remove + Delete Msg + Block in inbox`

    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) }) 
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let owr = m.chat.split`-`[0]

    try {
        let delet = m.message.extendedTextMessage.contextInfo.participant
        let bang = m.message.extendedTextMessage.contextInfo.stanzaId
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
    } catch {
        await conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    await conn.updateBlockStatus(user, 'block');

    m.reply(`✅ ᴜsᴇʀ ʜᴀs ʙᴇᴇɴ ᴇʟɪᴍɪɴᴀᴛᴇᴅ ᴀɴᴅ ʜɪs ᴍᴇssᴀɢᴇ ʜᴀs ʙᴇᴇɴ ᴅᴇʟᴇᴛᴇᴅ + ʙʟᴏᴄᴋᴇᴅ ɪɴ ᴅᴍ👋🏻`);
}

handler.help = ['kick3 @user', 'kkk @user']
handler.tags = ['group']
handler.command = ['kick3', 'expulsar3', 'k3', 'kkk'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;
