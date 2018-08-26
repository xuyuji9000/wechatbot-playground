const { Wechaty } = require('wechaty') // import { Wechaty } from 'wechaty'

const bot = Wechaty.instance() // Global Instance
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
.on('login',            user => console.log(`User ${user} logined`))
.on('message',       message => console.log(`Message: ${message}`))
.on('message', async message => {
    const room = message.room()
    console.log(room)
    const topic = await room.topic()
    console.log(topic)
    console.log(message.text())
    if("Coderbunker DevOps Team" == topic && "test" == message.text()) {
        message.room().say("Bot responding.")
    }
})
.start()