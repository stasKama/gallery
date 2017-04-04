$(document).ready(function () {

    var previewId = "#preview";
    var fileId = "#file";
    var submitid = '#submit-upload';
    var newName = '#file-name';

    var fileInfo = {};
   
    $(fileId).change(function () {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            var fileData = event.target.result;
            $(previewId).attr("src", fileData);
            fileInfo.filename = file.name;
            fileInfo.data = fileData;
        };

        reader.readAsDataURL(file);
    });
    
    /*$(submitid).click(function (e) {
        var nameImage = $(newName).value.length == 0 ? fileInfo.filename : $(newName).value + fileInfo.filename.substring(fileInfo.filename.lastIndexOf('.'));
        console.log(nameImage);
        $(submitid).prop('disabled', true);
        $.ajax({
            url: "/Image/AddImageAjax",
            type: 'POST',
            data: {
                fileName: nameImage,
                fileData: fileInfo.data
            },
            success: function (data) {
                $(submitid).prop('disabled', false);
                $(previewId).attr("src", "");
                $(fileId).val("");
                $(submitid).val("");
                alert('Image upload in server');
            },
            error: function () {
                alert('Error upload image');
            }
        });

        e.preventDefault();
    });*/
});