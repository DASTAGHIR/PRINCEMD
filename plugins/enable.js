//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
	

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
   
	  
	  
	  case 'jarvis':
     case 'autotalk':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
           throw false
          }}
      chat.jarvis = isEnable
     break
	
	  
	  case 'pmblocker':
	case 'pbm':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.pmblocker = isEnable
break	  

		  
		  case 'testbb':
	case 'testb':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.testbot = isEnable
break	

		  case 'sw':
		  case 'sview':
	case 'statusview':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.statusview = isEnable
break	


		  case 'alwaysonline':
	case 'online':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.alwaysonline = isEnable
break	


		  case 'statussaver':
	case 'savestatus':
		  case 'statussave':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.statussave = isEnable
break	


case 'anticall':
        case 'nocall':
          isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.anticalls = isEnable
break
		  


		  
 case 'autoread': case 'read':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.autoread2 = isEnable    
global.opts['autoread'] = isEnable      
break



		  
	case 'antiviewonce':
	case 'viewonce':
	  case 'vv':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.viewonce = isEnable
break	  

		  case 'reacts': case 'reaction':
	case 'autoreaction': case 'reactions': case 'autoreactions':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.autoreacts = isEnable
break	  


case 'antipmspam':
	case 'pmspam':
		  case 'spampm':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.pmspam = isEnable
break	  
		  

	  
 case 'autobio':
  isAll = true
  if (!isROwner) {
  global.dfail('rowner', m, conn)
  throw false
  }
  bot.autoBio = isEnable
  break	 
   
	  
	  
     case 'detect':
      case 'detector':
        if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
          throw false
        }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
     break
    
	  
     case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autosticker = isEnable
      break
      
	  
	  
      case 'antispam':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiSpam = isEnable
      break
   
	  
   case 'antidelete':
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break
  
	  
    case 'antitoxic':
    case 'antibadword':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiToxic = isEnable
      break

		  
    case 'document':
    case 'documento':
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
    chat.useDocument = isEnable
    break
 
	  
	  case 'autostatus':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      chat.viewStory = isEnable
      break

//🤍♥️🤍♥️🤍♥️🤍TEST CHAT		  


    case 'testf':
    case 'testfeature':
    case 'tst':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.testf = isEnable
      break


		  case 'antifake':
    case 'fake':
    case 'blockusers':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antifake = isEnable
      break


case 'antideletelinks':
    case 'deletelinks':
    case 'linksdelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antdeletelinks = isEnable
      break
		  

		  case 'nocmds':
    case 'anticommands':
    case 'blockcmds':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.anticmds = isEnable
      break


		  
		  case 'antilink2': case 'antilinkall':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break

		  
case 'antitiktok': case 'antitk': case 'antitik':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTiktok = isEnable 
break

		  
case 'antiyoutube': case 'antiyt':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiYoutube = isEnable 
break

		  
case 'antitelegram': case 'antitl': case 'antitele': case 'antitg': case 'antitel':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTelegram = isEnable 
break

		  
case 'antifacebook': case 'antifb': case 'antifbook':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiFacebook = isEnable 
break


		  
case 'antiinstagram': case 'antinstagram': case 'antiig': case 'antig': case 'antiinsta': case 'antinsta':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiInstagram = isEnable 
break


		  
case 'antitwitter': case 'antitw': case 'antitwit': case 'antitwter': case 'antitwiter': case 'antix':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitter = isEnable 
break


		  
case 'antidiscord':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiDiscord = isEnable 
break


		  
case 'antithreads':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiThreads = isEnable 
break
		  

case 'antitwitch':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitch = isEnable 
break

		  case 'antiporn': case 'antinude':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiPorn = isEnable          
break
		  
      case 'antibotclone':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBotClone = isEnable
      break

		  
      case 'nsfw':
      case '+18':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
            throw false
           }}
    chat.nsfw = isEnable          
    break

		  
    case 'autolevelup':
    isUser = true
     user.autolevelup = isEnable
     break

		  
     case 'chatbot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.chatbot = isEnable
      break

    case 'princechat':
	case 'princegpt':	  
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.princechat = isEnable
      break

		  
    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break

		  case 'public':
    case 'publico':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
		  
	  
	case 'autotype':
    case 'type':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      chat.autotype = isEnable
      break

		  
      


		  
    case 'onlypv':
    case 'onlydm':
    case 'onlymd':
    case 'pconly':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      //global.opts['solopv'] = isEnable
      bot.pconly = isEnable
      break
      
    case 'gponly':
    case 'onlygp':
    case 'grouponly':
    case 'gconly':
    case 'sologrupo':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      //global.opts['sologp'] = isEnable
      bot.gconly = isEnable
      break


		  
default:
     if (!/[01]/.test(command)) return m.reply(`
━━━━━━━━━━━━━【 *⚙️ BOT SETTINGS* ⚙️ 】━━━━━━━━━━━━━
                *✨ Toggle Features ✨*

╭━━━━━━━━━━━━━━【 *👑 OWNER CMD* 】━━━━━━━━━━━━━━╮

🔒 *\`${usedPrefix + command} public\`*  
   ➤ Switch bot between private and public mode

🚫 *\`${usedPrefix + command} pmblocker\`*  
   ➤ Block spam messages in inbox

💫 *\`${usedPrefix + command} autoreaction\`*  
   ➤ Enable auto-reactions to chats

🥏 *\`${usedPrefix + command} statussaver\`*  
   ➤ Enable auto statussaver to bot

🚀 *\`${usedPrefix + command} statusview\`*  
   ➤ Enable auto statusview to bot

💻 *\`${usedPrefix + command} alwaysonline\`*  
   ➤ Enable alwaysonline to bot

💬 *\`${usedPrefix + command} autoread\`*  
   ➤ Enable auto-reard chats

👀 *\`${usedPrefix + command} antiviewonce\`*  
   ➤ Enable viewonce to bot

🦠 *\`${usedPrefix + command} antipmspam\`*  
   ➤ Block spam and viruses in PMs

📩 *\`${usedPrefix + command} onlydm\`*  
   ➤ Limit bot to work only in DMs

👥 *\`${usedPrefix + command} onlyg\`*  
   ➤ Limit bot to work only in groups

⌨️ *\`${usedPrefix + command} autotype\`*  
   ➤ Show typing indicator in chats

🌐 *\`${usedPrefix + command} autobio\`*  
   ➤ Automatically update bot's bio

🚫 *\`${usedPrefix + command} antibotclone\`*  
   ➤ Remove cloned bots from groups

🔐 *\`${usedPrefix + command} restrict\`*  
   ➤ Restrict features like antilinkall

╭━━━━━━━━━━━━━━【 *⚡ ADMIN CMD* 】━━━━━━━━━━━━━━╮

🌟 *\`${usedPrefix + command} welcome\`*  
   ➤ Send welcome and goodbye messages

🖼️ *\`${usedPrefix + command} autosticker\`*  
   ➤ Automatically create stickers from images and videos

🔢 *\`${usedPrefix + command} antifake\`*  
   ➤ Enable antifake to group

🔍 *\`${usedPrefix + command} detect\`*  
   ➤ Feature coming soon…

🎤 *\`${usedPrefix + command} jarvis\`*  
   ➤ Activate the voice chatbot

🛡️ *\`${usedPrefix + command} antispam\`*  
   ➤ Detect and block spammers

📎 *\`${usedPrefix + command} antideletelinks\`*  
   ➤ Delete every links in groups

🚷 *\`${usedPrefix + command} nocmds\`*  
   ➤ Remove users who misuse commands

🌐 *\`${usedPrefix + command} antilinkall\`*  
   ➤ Detect and block all types of links

💢 *\`${usedPrefix + command} antitoxic\`*  
   ➤ Block toxic language

🎵 *\`${usedPrefix + command} antiTiktok\`*  
   ➤ Block Tiktok links

📹 *\`${usedPrefix + command} antiYoutube\`*  
   ➤ Block YouTube links

📱 *\`${usedPrefix + command} antiTelegram\`*  
   ➤ Block Telegram links

📘 *\`${usedPrefix + command} antiFacebook\`*  
   ➤ Block Facebook links

📸 *\`${usedPrefix + command} antiInstagram\`*  
   ➤ Block Instagram links

🐦 *\`${usedPrefix + command} antiTwitter\`*  
   ➤ Block Twitter links

🧵 *\`${usedPrefix + command} antiThreads\`*  
   ➤ Block Threads links

🎮 *\`${usedPrefix + command} antiDiscord\`*  
   ➤ Block Discord links

🎮 *\`${usedPrefix + command} antiTwitch\`*  
   ➤ Block Twitch links

🚫 *\`${usedPrefix + command} antinude\`*  
   ➤ Block adult content and explicit links

> ⚠️ *Bot automatically removes violators* ⚠️

╭━━━━━━━━━━━━━━【 *💬 USER CMD* 】━━━━━━━━━━━━━━╮

🗨️ *\`${usedPrefix + command} chatbot\`*  
   ➤ Start a conversation with the bot

🤖 *\`${usedPrefix + command} princechat\`* or *\`${usedPrefix}princegpt\`*  
   ➤ Chat with Princebot (ask anything!)

━━━━━━━━━━━━━━【 *EXAMPLES* 】━━━━━━━━━━━━━━

   To toggle features, use *\`${usedPrefix}on\`* or *\`${usedPrefix}off\`*:

   *\`${usedPrefix}on welcome\`*  
   *\`${usedPrefix}off welcome\`*
`)
      throw false

}		  

m.reply(`
✅ *${type.toUpperCase()}* *${isEnable ? `${mssg.nable}` : `${mssg.disable}`}* ${isAll ? `${mssg.toBot}` : isUser ? '' : `${mssg.toGp}`}
`.trim())  

}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['config']
handler.command = /^(setting|settings|(en|dis)able|(turn)?o(n|ff)|[01])$/i

export default handler
