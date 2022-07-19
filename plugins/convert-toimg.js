let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `balas stiker dengan perintah *${usedPrefix + command}*`
  try {
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw `balas stiker dengan perintah *${usedPrefix + command}*`
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
      out = await webp2png(media)
    }
    if(!out) throw `ERROR`
    await conn.sendFile(m.chat, out, 'out.png', '', m, false, { thumbnail: out })
  } catch(e) {
    m.reply(`ERROR\nJika Stiker GIF, Silahkan memakai perintah .tovideo atau .togif`)
  }
  
}

handler.help = ['toimg']
handler.tags = ['sticker','top','convert']
handler.command = ['toimg']

module.exports = handler
