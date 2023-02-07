const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

require('./utils/databaseConnection');

const app = express()
const server = http.Server(app);
const io = socketIO(server);
const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    sameSite: false,
    optionsSuccessStatus: 200
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const rootRouter = require("./routes/rootRouter")
app.use("/api", rootRouter)

// Socket.io namespace
const ns = io.of('/chat');

ns.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        ns.in(data.room).emit('new message', {user: data.user, message: data.message});
    });

});

server.listen(process.env.PORT || 4000, () => {
    console.log("Server start");
});
