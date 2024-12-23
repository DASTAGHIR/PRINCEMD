import fg from 'api-dylux'
let handler = async (m, { conn, text, args }) => {
if (!text) throw `✳️ Enter the Username of a TikTok user`
m.react("⌛");
try {
const apiUrl = `https://deliriussapi-oficial.vercel.app/tools/tiktokstalk?q=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.result || !delius.result.users) return m.react("❌");
const profile = delius.result.users;
const stats = delius.result.stats;
const txt = `👤 *TikTok Profile*:
*• Username*: ${profile.username}
*• Nickname*: ${profile.nickname}
*• Verified*: ${profile.verified ? 'Yes' : 'No'}
*• Followers*: ${stats.followerCount.toLocaleString()}
*• Following*: ${stats.followingCount.toLocaleString()}
*• Total Likes*: ${stats.heartCount.toLocaleString()}
*• Videos*: ${stats.videoCount.toLocaleString()}
*• Bio*: ${profile.signature}
*• URL*: 
${profile.url}`;

await conn.sendFile(m.chat, profile.avatarLarger, 'tt.png', txt, m, null);
m.react("✅");
} catch (e2) {
try {
  let res = await fg.ttStalk(args[0])
  let txt = `👤 *TikTok Profile*:
*• Name:* ${res.name}
*• Username:* ${res.username}
*• Followers:* ${res.followers}
*• Following:* ${res.following}
*• Description:* ${res.desc}
*• Link* : https://tiktok.com/${res.username}`
await conn.sendFile(m.chat, res.profile, 'tt.png', txt, m, null, fake)
m.react("✅");
} catch (e) {
await m.react(`❌`) 
m.reply('⚠️ AN ERROR OCCURRED ⚠️')       
console.log(e)
}}}
handler.help = ['tiktokstalk']
handler.tags = ['downloader']
handler.command = /^t(tstalk|iktokstalk|iktoksearch|tsearch)$/i
export default handler
