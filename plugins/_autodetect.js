let WAMessageStubType = (await import(global.baileys)).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://telegra.ph/file/2a1d71ab744b55b28f1ae.jpg');
    let img = await (await fetch(`${pp}`)).buffer();
    let usuario = `@${m.sender.split`@`[0]}`;
    let fkontak = {
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net"
    };
    let chat = global.db.data.chats[m.chat];
    let users = participants.map(u => conn.decodeJid(u.id));
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');

    if (chat.detect && m.messageStubType == 21) {
        await this.sendMessage(m.chat, { 
            text: `${usuario} \`HAS CHANGED THE GROUP NAME TO:\`\n\n> *${m.messageStubParameters[0]}*`, 
            mentions: [m.sender], 
            mentions: [...groupAdmins.map(v => v.id)] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 22) {
        await this.sendMessage(m.chat, { 
            text: `${usuario} \`HAS CHANGED THE GROUP PHOTO\``, 
            mentions: [m.sender] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 24) {
        await this.sendMessage(m.chat, { 
            text: `${usuario} THE NEW GROUP DESCRIPTION IS:\n\n${m.messageStubParameters[0]}`, 
            mentions: [m.sender] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 25) {
        await this.sendMessage(m.chat, { 
            text: `🔒 NOW *${m.messageStubParameters[0] == 'on' ? 'ONLY ADMINS' : 'EVERYONE'}* CAN EDIT THE GROUP INFORMATION`, 
            mentions: [m.sender] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 26) {
        await this.sendMessage(m.chat, { 
            text: `THE GROUP *${m.messageStubParameters[0] == 'on' ? 'IS NOW CLOSED 🔒' : 'IS NOW OPEN 🔓'}*\n ${m.messageStubParameters[0] == 'on' ? 'ONLY ADMINS CAN WRITE' : 'EVERYONE CAN WRITE'} IN THIS GROUP`, 
            mentions: [m.sender] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 29) {
        await this.sendMessage(m.chat, { 
            text: `@${m.messageStubParameters[0].split`@`[0]} IS NOW AN ADMIN IN THIS GROUP\n\n🤍ACTION CARRIED OUT BY: ${usuario}`, 
            mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 30) {
        await this.sendMessage(m.chat, { 
            text: `@${m.messageStubParameters[0].split`@`[0]} IS NO LONGER AN ADMIN IN THIS GROUP\n\n🤍ACTION CARRIED OUT BY: ${usuario}`, 
            mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType === 172 && m.messageStubParameters.length > 0) {
        const rawUser = m.messageStubParameters[0];
        const users = rawUser.split('@')[0];
        const forbiddenPrefixes = process.env.ANTIFAKE_USERS.split(',');
        const usersWithPrefix = users.startsWith('+') ? users : `+${users}`;

        if (chat.antifake) {
            if (forbiddenPrefixes.some(prefix => usersWithPrefix.startsWith(prefix))) {
                try {
                    await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'reject');
                    console.log(`Automatically rejected the entry request from ${usersWithPrefix} due to a forbidden prefix.`);
                } catch (error) {
                    console.error(`Error rejecting the request from ${usersWithPrefix}:`, error);
                }
            } else {
                try {
                    await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
                    console.log(`Automatically approved the entry request from ${usersWithPrefix}.`);
                } catch (error) {
                    console.error(`Error approving the request from ${usersWithPrefix}:`, error);
                }
            }
        } else {
            try {
                await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
                console.log(`Automatically approved the entry request from ${usersWithPrefix} since #antifake is disabled.`);
            } catch (error) {
                console.error(`Error approving the request from ${usersWithPrefix}:`, error);
            }
        }
        return;
    } else if (chat.detect && m.messageStubType == 72) {
        await this.sendMessage(m.chat, { 
            text: `${usuario} CHANGED THE TEMPORARY MESSAGE DURATION FOR *@${m.messageStubParameters[0]}*`, 
            mentions: [m.sender] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else if (chat.detect && m.messageStubType == 123) {
        await this.sendMessage(m.chat, { 
            text: `${usuario} *DISABLED* TEMPORARY MESSAGES.`, 
            mentions: [m.sender] 
        }, { 
            quoted: fkontak, 
            ephemeralExpiration: 24 * 60 * 100, 
            disappearingMessagesInChat: 24 * 60 * 100
        });
    } else {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType], 
        });
    }
}
