const express = require('express');
const reload = require('reload');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

io.on('connection', socket => {
    // setInterval(() => {
    //     const num = Math.random();
    //     socket.emit('SERVER_SEND_MESSAGE', num);
    // }, 1000);
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', message);
    });
});

reload(app);
server.listen(3000, () => console.log('Server start!'));
