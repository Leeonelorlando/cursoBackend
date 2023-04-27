const http = require('http')
const moment = require('moment')

let currentDate = moment()
let validCurrentDate = currentDate.isValid()
currentDate = currentDate//.format("MMM Do YY")

let bornDate = moment(19981001)
let validbornDate = bornDate.isValid()
bornDate = bornDate//.format("MMM Do YY")

let days = currentDate.diff(bornDate, 'days')/1000
console.log(days)

const server = http.createServer(
    (req,res) => res.end(`hoy tenés ${days} días de edad!`)
)

const PORT = 8080
const callback = () => console.log('server ready on port: ' + PORT)

server.listen(
    PORT,
    callback
)