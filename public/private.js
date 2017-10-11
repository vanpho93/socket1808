const socket = io();

$('#btnSendPrivate').click((e) => {
    e.preventDefault();
    const message = $('#txtMessage').val();
    const token = localStorage.getItem('token');
    socket.emit('CLIENT_SEND_PRIVATE_MESSAGE', { message, receiverSocketId, token });
    $('#txtMessage').val('');
});
