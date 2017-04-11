$(document).ready(function () {
    var previewId = "#preview";
    var fileId = "#file";
    var submitId = '#submit';
    var newNameId = '#fileName';
    var messageId = "#message";

    var fileInfo = {};

    $(submitId).attr('disabled', true);
    $(submitId).addClass("no-active");

    $(fileId).change(function () {
        $(messageId).hide();
        var file = this.files[0];
        var reader = new FileReader();
        $(submitId).attr('disabled', false);
        $(submitId).addClass("active");
        $(submitId).removeClass("no-active");
        reader.onload = function (event) {
            var fileData = event.target.result;
            $(previewId).attr("src", fileData);
            fileInfo.filename = file.name;
            fileInfo.data = fileData;
            $(newNameId).val(file.name.substring(0, file.name.lastIndexOf(".")));
        };
        reader.readAsDataURL(file);
    });

    $(submitId).click(function (e) {
        $(submitId).attr('disabled', true);
        $(submitId).addClass("no-active");
        $(submitId).removeClass("active");
        $.ajax({
            type: 'POST',
            url: "/Image/AddImageAjax",
            data: {
                fileName: fileInfo.filename,
                fileData: fileInfo.data,
                newName: $(newNameId).val().toString()
            },
            success: function (data) {
                if (data) {
                    $(previewId).attr("src", "");
                    $(fileId).val("");
                    $(newNameId).val("");
                    $(messageId).text("Image upload in server!");
                    $(messageId).show();
                } else {
                    $(messageId).text("Image with this name exists!");
                    $(messageId).show();
                    $(submitId).attr('disabled', false);
                    $(submitId).addClass("active");
                    $(submitId).removeClass("no-active");
                }
            },
            error: function () {
                alert('Error upload image');
            }
        });

        e.preventDefault();
        
    });

});