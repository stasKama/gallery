function showInformation() {
    $.ajax({
        type: "POST",
        url: 'Image/GetImages',
       
        contentType: "application/json; charset=utf-8",
        processData: false,
        dataType: "json",
        success: function (data) {
            alert(data);
        },
        error: function (e) {
            alert('lol');
        }
    });
}