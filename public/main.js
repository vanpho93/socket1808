const socket = io();

let receiverSocketId;

$('#divChat').hide();

recoverUserStatus();

socket.on('SERVER_SEND_MESSAGE', message => {
    $('#divMessages').append(`<p>${message}</p>`)
});

// $('#btnSend').click(() => {
//     const message = $('#txtMessage').val();
//     socket.emit('CLIENT_SEND_MESSAGE', message);
//     $('#txtMessage').val('');
// });

$('#formChat').submit((e) => {
    e.preventDefault();
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MESSAGE', message);
    $('#txtMessage').val('');
});

$('#formSignIn').submit((e) => {
    e.preventDefault();
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_IN', username);
    $('#txtUsername').val('');
});

socket.on('COMFIRM_SIGN_IN', result => {
    if (!result) return alert('Username has already exist');
    $('#divChat').show();
    $('#formSignIn').hide();
    const { users, token } = result;
    users.forEach(user => {
        $('#divUsers').append(`<a id="sid-${user.socketId}" socketId="${user.socketId}" href="/chat/${user.socketId}">${user.username}</a><br />`);
    });
    localStorage.setItem('token', token);

    socket.on('NEW_USER', user => {
        $('#divUsers').append(`<a id="sid-${user.socketId}" socketId="${user.socketId}" href="/chat/${user.socketId}">${user.username}</a><br />`);
    });
});

socket.on('USER_DISCONECT', socketId => {
    const divId = '#sid-' + socketId;
    $(divId).remove();
});

// $('#divUsers div').click(function() {
//     const id = $(this).attr('id');
//     console.log(id);
// });

$('#divUsers').on('click', 'div', function() {
    receiverSocketId = $(this).attr('socketId');
    $('#divUsers div').removeClass('active');
    $(this).addClass('active');
});

$('#btnSendPrivate').click((e) => {
    e.preventDefault();
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_PRIVATE_MESSAGE', { message, receiverSocketId });
    $('#txtMessage').val('');
});

$('#btnLogOut').click(() => {
    socket.close();
    $('#divChat').hide();
    $('#formSignIn').show();
    localStorage.removeItem('token');
});

function recoverUserStatus() {
    const token = localStorage.getItem('token');
    if (token) socket.emit('CLIENT_RESIGN_IN', token);
}
