import { createHash } from 'crypto';  
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;  
let handler = async function (m, { conn, text, usedPrefix, command }) {  
  let user = global.db.data.users[m.sender];  
  let name2 = conn.getName(m.sender);  

  // ✋ Prevent duplicate registrations
  if (user.registered === true) throw `✳️ You're already registered!  

  Want to re-register?  

  📌 Use this command to remove your registration:  
  *${usedPrefix}unreg* <Serial Number>`;  

  // ⚠️ Validate input format
  if (!Reg.test(text)) throw `⚠️ Invalid format!  

  ✳️ Use the command like this:  
  *${usedPrefix + command} name.age*  

  📌 Example: *${usedPrefix + command}* ${name2}.22`;  

  // 📋 Extract and validate name and age
  let [_, name, splitter, age] = text.match(Reg);  
  if (!name) throw '✳️ Name cannot be empty!';  
  if (!age) throw '✳️ Age cannot be empty!';  
  if (name.length >= 30) throw '✳️ Name is too long!';  

  // 👶 Age validation
  age = parseInt(age);  
  if (age > 100) throw '👴 Wow, Grandpa wants to play with the bot!';  
  if (age < 5) throw '🚼 Baby Grandpa wants to register!';  

  // 💾 Save user details
  user.name = name.trim();  
  user.age = age;  
  user.regTime = +new Date();  
  user.registered = true;  
  let sn = createHash('md5').update(m.sender).digest('hex');  

  // 📜 Reply with registration details
  m.reply(`  
╭◉ *🌟 REGISTERED 🌟*• 
╠ ○ *Name:* ${name}  
╠ ○ *Age:* ${age} years  
╠ ○ *Serial Number:*  
╠ ○  ${sn}  
╚•  

📌 Use *${usedPrefix}help* to view the menu!  
  `.trim());  
};  

handler.help = ['reg', 'register'].map(v => v + ' <name.age>');  
handler.tags = ['rg'];  
handler.command = ['verify', 'reg', 'register', 'registrar'];  

export default handler;
