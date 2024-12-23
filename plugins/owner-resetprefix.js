let handler = async(m, { conn }) => {

    global.prefix = new RegExp('^[' + (process.env.PREFIX|| '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
      await m.reply(`*_PREFIX SUCCESSFULLY RESET_*✅`)
  }
  handler.help = ['resetprefix']
  handler.tags = ['owner']
  handler.command = /^(resetprefix)$/i
  handler.owner = true
  
  
  export default handler
