const express = require('express');

const { sign, verify } = require('./jwt');
const reload = require('reload');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

app.get('/chat/:id', (req, res) => {
    res.render('privateChat', { receiverSocketId: req.params.id });
});

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
        const isExist = users.some(user => {
            return user.username === username;
        });
        if (isExist) return socket.emit('COMFIRM_SIGN_IN', null);
        socket.username = username;
        const user = new User(username, socket.id);
        sign({ username })
        .then(token => {
            socket.emit('COMFIRM_SIGN_IN', { users, token });
            users.push(user);
            io.emit('NEW_USER', user);
        });
    });

    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', `${socket.username}: ${message}`);
    });

    socket.on('disconnect', () => {
        const name = socket.username;
        const index = users.findIndex(user => user.username === name);
        users.splice(index, 1);
        io.emit('USER_DISCONECT', socket.id);
    });

    socket.on('CLIENT_SEND_PRIVATE_MESSAGE', obj => {
        const { message, receiverSocketId, token } = obj;
        if (socket.username) {
            socket.to(receiverSocketId)
                .emit('SERVER_SEND_MESSAGE', `${socket.username}: ${message}`);
            return socket.emit('SERVER_SEND_MESSAGE', `${socket.username}: ${message}`);
        }
        if (token) {
            verify(token)
            .then(obj => {
                const { username } = obj;
                socket.to(receiverSocketId)
                .emit('SERVER_SEND_MESSAGE', `${username}: ${message}`);
            });
        }
    });

    socket.on('CLIENT_RESIGN_IN', token => {
        verify(token)
        .then(obj => {
            const { username } = obj;
            const isExist = users.some(user => {
                return user.username === username;
            });
            if (isExist) return socket.emit('COMFIRM_SIGN_IN', null);
            socket.username = username;
            const user = new User(username, socket.id);
            sign({ username })
            .then(token => {
                socket.emit('COMFIRM_SIGN_IN', { users, token });
                users.push(user);
                io.emit('NEW_USER', user);
            });
        })
    });
});

reload(app);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Server start!'));

// $('#divxx).remove();
