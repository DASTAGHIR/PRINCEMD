import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ Please provide a query.\nExample: *${usedPrefix + command} Hi*`
    
    m.react('⏳') // React with waiting emoji
    
    try {
        // Fetch response from BK9 ACloudAI API
        let res = await fetch(`https://bk9.fun/ai/acloudai?q=${encodeURIComponent(args.join(' '))}`)
        if (!res.ok) throw `❎ Failed to fetch response from ACloudAI. Please try again.`
        
        // Parse the response
        let data = await res.json()
        if (!data.status) throw `❎ Error: ${data.err || 'Unknown error'}`
        
        // Send ACloudAI's response
        m.react('✅') // React with done emoji
        m.reply(data.BK9 || '❎ No response available.')
    } catch (error) {
        console.error('Error:', error)
        m.reply(`❎ Failed to process your request. Please try again.`)
    }
}

handler.help = ['acloudai <query>']
handler.tags = ['study']
handler.command = ['acloudai']

export default handler
