$('#btnShow').text('ABCD');

$('#btnShow').click(() => {
    const message = $('#txtMessage').val();
    alert(message);
});

$('h3').click(function() {
    $('h3').removeClass('active');
    $(this).addClass('active');
});

$('#btnShow').click(() => {
    const message = $('#txtMessage').val();
    $('#divSubjects').append(`<h3>${message}</h3>`);
    $('#txtMessage').val('');
});
