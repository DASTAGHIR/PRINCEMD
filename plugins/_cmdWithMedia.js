const {
    proto,
    generateWAMessage,
    areJidsSameUser
} = (await import('@whiskeysockets/baileys')).default;

export async function all(m, chatUpdate) {
    try {
        // Avoid processing Baileys' own messages
        if (m.isBaileys) return;

        // Ensure the message and the required fileSha256 are present
        if (!m.message) return;
        if (!m.msg.fileSha256) return;

        // Check if the sticker exists in the database
        const stickerBase64 = Buffer.from(m.msg.fileSha256).toString('base64');
        if (!(stickerBase64 in global.db.data.sticker)) return;

        // Retrieve the sticker information
        let hash = global.db.data.sticker[stickerBase64];
        let { text, mentionedJid } = hash;

        // Generate a WA message with the sticker info
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: this.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        });

        // Set up message keys
        messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
        messages.key.id = m.key.id;
        messages.pushName = m.pushName;

        // If in a group, set the participant sender
        if (m.isGroup) messages.participant = m.sender;

        // Prepare the message for upsert
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        };

        // Emit the message upsert event
        this.ev.emit('messages.upsert', msg);
        
    } catch (e) {
        // Log the error without sending it as a message
        console.error('Error occurred in processing the message:', e);
    }
}
