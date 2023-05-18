import server from "./app.js"
import { Server } from "socket.io"

const PORT = 8080
const ready = ()=> console.log('server ready on port '+PORT)

let http_server = server.listen(PORT,ready)
let socket_server = new Server(http_server)

socket_server.on(
    'client_connected',
    socket => {
        console.log(socket)
        console.log('client connected')
    }
)