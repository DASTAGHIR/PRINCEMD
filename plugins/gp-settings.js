let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Determine group setting based on command
    let isClose = {
        'open': 'not_announcement',  // Open group for all members
        'unmute': 'not_announcement', // Alias for open
        'close': 'announcement',     // Restrict group to admin-only
        'mute': 'announcement'       // Alias for close
    }[command]; // Map the command to the group setting

    // Validate the command
    if (!isClose) {
        return m.reply(`
 💱 ${mssg.gpSetting}

*⚙️ ${usedPrefix}close / ${usedPrefix}mute* - Restrict group to admin-only
*⚙️ ${usedPrefix}open / ${usedPrefix}unmute* - Allow all members to send messages
`);
    }

    // Update group settings
    try {
        await conn.groupSettingUpdate(m.chat, isClose);
        m.reply(`✅ Group successfully set to *${command}* mode.`);
    } catch (e) {
        m.reply(`❌ Failed to update group settings. Make sure I am an admin.`);
    }
};

// Command metadata
handler.help = ['mute', 'close', 'unmute', 'open'];
handler.tags = ['group'];
handler.command = ['mute', 'close', 'unmute', 'open']; // Commands supported
handler.admin = true; // User must be an admin
handler.botAdmin = true; // Bot must be an admin
handler.group = true; // Only applicable in groups

export default handler;
