const express = require('express');
const reload = require('reload');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

reload(app);
server.listen(3000, () => console.log('Server start!'));
