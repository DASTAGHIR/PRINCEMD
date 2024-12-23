
let handler = async (m, { conn, usedPrefix, command }) => {
	
if (!m.mentionedJid[0] && !m.quoted) return m.reply(`✳️ ${mssg.useCmd}\n\n*${usedPrefix + command}* @tag`) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
if (conn.user.jid.includes(user)) return m.reply(`✳️ I can't do a auto kick`)

await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
m.reply(`✅ ${mssg.kick}`) 

}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = ['kick', 'k'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
