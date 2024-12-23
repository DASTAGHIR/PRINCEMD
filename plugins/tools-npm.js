import fetch from 'node-fetch';

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ Please use the command like this:\n *${usedPrefix + command}* <npm-package-name>`;
    const packageName = args[0].trim();
    m.react('⏳'); // Indicate processing

    try {
        let res = await fetch(`https://bk9.fun/stalk/npm?package=${encodeURIComponent(packageName)}`);
        if (!res.ok) throw `❎ Unable to fetch details. Please try again later.`;
        
        let data = await res.json();
        if (!data.status || !data.BK9) throw `❎ Package "${packageName}" not found.`;

        const pkg = data.BK9;

        // Extract only the relevant info fields
        const info = `
📈 *Weekly Downloads*: ${pkg.info.find(i => i.type === 'DownloadsWeekly Downloads')?.result || 'No download data available'}
🔖 *Version*: ${pkg.info.find(i => i.type === 'Version')?.result || 'No version available'}
🗓️ *Last Publish*: ${pkg.info.find(i => i.type === 'Last publish')?.result || 'No last publish date available'}
🔑 *License*: ${pkg.info.find(i => i.type === 'License')?.result || 'No license data available'}
        `.trim();

        m.reply(info);
    } catch (error) {
        console.error(error);
        m.reply(`❎ Failed to fetch package details. Please try again later.`);
    }
};

handler.help = ['npm <package-name>'];
handler.tags = ['tools'];
handler.command = ['npm', 'npmpackage'];

export default handler;
