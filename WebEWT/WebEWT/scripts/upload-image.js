$(document).ready(function () {
    var previewId = "#preview";
    var fileId = "#file";
    var submitId = '#submit';
    var newNameId = '#fileName';

    var fileInfo = {};
    
    $(fileId).change(function () {
        var file = this.files[0];
        var reader = new FileReader();
        $(submitId).prop('disabled', false);
        $(submitId).addClass(".active-submit");
        reader.onload = function (event) {
            var fileData = event.target.result;
            $(previewId).attr("src", fileData);
            fileInfo.filename = file.name;
            fileInfo.data = fileData;

        };
        reader.readAsDataURL(file);
    });

    $(submitId).click(function (e) {
        $(submitId).prop('disabled', true);
        $.ajax({
            type: 'POST',
            url: "/Image/AddImageAjax",
            data: {
                fileName: fileInfo.filename,
                fileData: fileInfo.data,
                newName: $(newNameId).val().toString()
            },
            success: function (data) {
                $(submitId).prop('disabled', false);
                $(previewId).attr("src", "");
                $(fileId).val("");
                $(newNameId).val("");
                $(submitId).remuveClass(".active-submit");
            },
            error: function () {
                alert('Error upload image');
            }
        });

        e.preventDefault();
        
    });

});