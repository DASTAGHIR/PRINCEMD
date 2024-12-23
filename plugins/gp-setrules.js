
let handler = async function (m, { conn, text, usedPrefix }) {
	
	let chat = global.db.data.chats[m.chat]
  if (text) {
    chat.rules = text
    m.reply(`✅ ${mssg.rulesMsgOn}`)
  } else throw `✳️ ${mssg.rulesMsg}`
     
}
handler.help = ['setrules <text>']
handler.tags = ['group']
handler.command = ['setrules', 'addrules', 'addrule'] 
handler.group = true
handler.admin = true

export default handler
