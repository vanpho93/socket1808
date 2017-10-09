const express = require('express');
// const reload = require('reload');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

class User {
    constructor(username, socketId) {
        this.username = username;
        this.socketId = socketId;
    }
}

//alert

const users = [];

io.on('connection', socket => {
    // setInterval(() => {
    //     const num = Math.random();
    //     socket.emit('SERVER_SEND_MESSAGE', num);
    // }, 1000);
    socket.on('CLIENT_SIGN_IN', username => {
        // Kiem tra su ton tai
    });

    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', message);
    });
});

// reload(app);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Server start!'));
