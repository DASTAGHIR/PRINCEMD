import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.useCmd}\n *${usedPrefix + command}* enter your search query`
    m.react(rwait)

    try {
        let res = await fetch(`https://bk9.fun/ai/ai-search?q=${encodeURIComponent(args[0])}`)
        if (!res.ok) throw `❎ ${mssg.error}`
        let data = await res.json()

        // Check if the response contains 'BK9' field
        if (data.BK9) {
            m.react(done)  // React with thumbs-up if result is found
            // Send the result as a message
            conn.sendMessage(m.chat, {
                text: `⚡ **Answer:**\n\n${data.BK9}`,
                quoted: m
            })
        } else {
            m.react('❌')  // React with a cross if no result is found
            m.reply(`❎ No relevant information found.`)  // Send a message if no result
        }
    } catch (error) {
        m.react('❌')  // React with a cross if there's an error
        m.reply(`❎ An error occurred, please try again later.`)  // Send error message
    }
}

handler.help = ['aisearch <query>', 'bot <query>']
handler.tags = ['study']
handler.command = ['aisearch', 'bot']

export default handler
