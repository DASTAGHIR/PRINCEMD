import fetch from 'node-fetch'

let handler = async (m, { text }) => {
  if (!text) throw `*[ ❗️ ] ENTER THE TITLE OR NAME OF THE NPMJS (NPM.ORG) SCRAPER TO SEARCH*`
  let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
  let { objects } = await res.json()
  if (!objects.length) throw `[ ❗️ ] THE SEARCH "${text}" WAS NOT FOUND\n\nTRY WITH OTHER RESULTS`
  let txt = objects.map(({ package: pkg }) => {
    return `
  ✰ 𝐍𝐚𝐦𝐞: ${pkg.name}
  ✰ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: V${pkg.version}
  ✰ 𝐋𝐢𝐧𝐤: ${pkg.links.npm}
  ✰ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${pkg.description}\n\n\`\`\`----------\`\`\``
  }).join`\n`
  m.reply(txt)
}
handler.help = ['npmjs']
handler.tags = ['tools']
handler.command = /^npmjs?$/i

export default handler
