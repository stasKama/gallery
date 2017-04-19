$(document).ready(function () {
    var previewId = "#preview";
    var fileId = "#file";
    var submitId = '#submit';
    var newNameId = '#fileName';
    var messageId = "#message";

    var fileInfo = {};
    var expansionImage;

    $(submitId).attr('disabled', true);
    $(submitId).addClass("no-active");

    $(fileId).change(function () {
        $(messageId).hide();
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var fileData = event.target.result;
            $(previewId).attr("src", fileData);
            expansionImage = file.name.substring(file.name.lastIndexOf("."));
            fileInfo.data = fileData;
            $(newNameId).val(file.name.substring(0, file.name.lastIndexOf(".")));
            isNameAvailable();
        };
        reader.readAsDataURL(file);
    });

    $(newNameId).keyup(function () {
        if ($(newNameId).val() != "") {
            isNameAvailable();
        } else {
            if ($(submitId).hasClass("active")) {
                $(submitId).removeClass("active");
                $(submitId).addClass("no-active");
            }
            $(messageId).text("Enter name in field \"Name Image\"");
        }
    });

    function isNameAvailable() {
        $.ajax({
            type: 'POST',
            url: "/Image/CheckImageName",
            data: {
                imageName: $(newNameId).val()
            },
            success: function (data) {
                if (data) {
                    $(submitId).attr('disabled', false);
                    if ($(submitId).hasClass("no-active")) {
                        $(submitId).removeClass("no-active");
                        $(submitId).addClass("active");
                    }
                } else {
                    activeUploadmage();
                }
                var text = data ? "Image with this name is not in the collection!" : "Image with this name exists!";
                $(messageId).text(text);
                $(messageId).show();
            },
            error: function () {
                alert('Error upload image');
            }
        });
    }

    function activeUploadmage() {
        $(submitId).attr('disabled', true);
        if ($(submitId).hasClass("active")) {
            $(submitId).removeClass("active");
            $(submitId).addClass("no-active");
        }
    }

    $(submitId).click(function (e) {
        activeUploadmage();
        $.ajax({
            type: 'POST',
            url: "/Image/AddImageAjax",
            data: {
                fileName: $(newNameId).val().toString() + expansionImage,
                fileData: fileInfo.data
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
                }
            },
            error: function () {
                alert('Error upload image');
            }
        });

        e.preventDefault();
        
    });

});