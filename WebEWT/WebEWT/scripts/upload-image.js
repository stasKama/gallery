$(document).ready(function () {

    var previewId = "#preview";
    var fileId = "#file";

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
});