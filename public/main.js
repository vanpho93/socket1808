const socket = io();

socket.on('SERVER_SEND_MESSAGE', message => {
    $('#divMessages').append(`<p>${message}</p>`)
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MESSAGE', message);
    $('#txtMessage').val('');
});