const { Wechaty, Room } = require('wechaty') // import { Wechaty } from 'wechaty'
const express = require('express')
const bodyParser = require('body-parser')



const TOPIC = "family 家"


var bot = Wechaty.instance() // Global Instance
    .on('scan', (qrcode, status) => {
        console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
    })
    .on('login',            user => console.log(`User ${user} logined`))
    .on('message',       message => console.log(`Message: ${message}`))
    .on('message', async message => {
        const room = message.room()
        console.log(room)
        const topic = await room.topic()
        console.log(topic)
        console.log(message.text())
        if(TOPIC == topic && "test" == message.text()) {
            message.room().say("Bot responding.")
        }
    })

bot.start()

var app = express()
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// respond with "hello world" when a GET request is made to the homepage
app.post('/', function (req, res) {
    bot.Room.find({topic: TOPIC})
    .then(function(room) {
        if(room) {
          console.log(req.body)
          room.say('endpoint called')
          res.send('room notified')
        } else {
          res.send('cannot find room')
        }
    })
    .catch(function(err) {
        res.send(`error ${err}`)
    })

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))