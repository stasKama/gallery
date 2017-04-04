$(document).ready(function () {

    var checkboxExpansion = $("input:checkbox");
    var arrayImages;
    var maxIndex;

    $.ajax({
        type: "POST",
        url: "/Image/GetImages",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    $("input:checkbox").on("change", function () {
        var $imagesGallery = $(".images").find(".cell");
        $($imagesGallery).hide();
        for (var i = 0; i < checkboxExpansion.length; i++) {
            if ($(checkboxExpansion[i]).prop('checked')) {
                for (var j = 0; j < $imagesGallery.length; j++) {
                    var expansion = $($($($imagesGallery[j]).find("img")[0])).attr("src").split(".")[1];
                    expansion = expansion != 'png' && expansion != 'jpg' ? 'other' : expansion;
                    if (expansion == $(checkboxExpansion[i]).val().toString()) {
                            $($imagesGallery[j]).show();
                    }
                }
            }
        }
    });

    function successFunc(data, status) {

        arrayImages = data;
        maxIndex = arrayImages.length;
        for (var i = 0; i < maxIndex; i++) {
            var expansion = arrayImages[i].substring(arrayImages[i].lastIndexOf('.') + 1);
            var classImage = expansion != 'png' && expansion != 'jpg' ? 'other' : expansion;
            var image = '<div class="cell"><img src="' + arrayImages[i] + '" alt="Невозможно отбразить" class="' + classImage + '"/></div>'
            $(".images").append(image);
        }
    }

    function errorFunc(errorData) {
        alert('Ошибка');
    }
});
