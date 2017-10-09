const socket = io();

$('#divChat').hide();

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

socket.on('COMFIRM_SIGN_IN', users => {
    if (!users) return alert('Username has already exist');
    $('#divChat').show();
    $('#formSignIn').hide();
    users.forEach(user => {
        $('#divUsers').append(`<div>${user.username}</div>`)
    });

    socket.on('NEW_USER', user => {
        $('#divUsers').append(`<div>${user.username}</div>`);
    });
});
