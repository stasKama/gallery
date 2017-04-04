$(document).ready(function () {

    var checkboxExpansion = $("input:checkbox");
    var arrayImages;
    var maxIndex;
    var srcImageShow;
    var indexImage;

    $.ajax({
        type: "POST",
        url: "/Image/GetImages",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {

        arrayImages = data;
        maxIndex = arrayImages.length;
        for (var i = 0; i < maxIndex; i++) {
            var expansion = arrayImages[i].substring(arrayImages[i].lastIndexOf('.') + 1);
            var classImage = expansion != 'png' && expansion != 'jpg' ? 'other' : expansion;
            var image = '<img class="cell ' + classImage + '" src="' + arrayImages[i] + '" alt="Невозможно отбразить"/>'
            $(".images").append(image);
        }
    }

    function errorFunc(errorData) {
        alert('Ошибка загрузки');
    }

    $("input:checkbox").on("change", function () {
        var $imagesGallery = $(".images").find("img");
        $($imagesGallery).hide();
        for (var i = 0; i < checkboxExpansion.length; i++) {
            if ($(checkboxExpansion[i]).prop('checked')) {
                for (var j = 0; j < $imagesGallery.length; j++) {
                    var expansion = $($imagesGallery[j]).attr("src").split(".")[1];
                    expansion = expansion != 'png' && expansion != 'jpg' ? 'other' : expansion;
                    if (expansion == $(checkboxExpansion[i]).val().toString()) {
                        $($imagesGallery[j]).show();
                    }
                }
            }
        }
    });
    
    $(document).on('click', 'img', function () {
        if ($(".one-image").is(":hidden")) {
            $('html').addClass("scroll-html");
            $(".one-image").show();
            srcImageShow = $(this).attr("src");
            $("#one-img").attr("src", srcImageShow);
            indexImage = $(this).index();
            $("#bt-next-img").show();
            $("#bt-previous-img").show();
            testLast();
            testFirst();
        }
        else {
            $('html').removeClass("scroll-html");
            $(".one-image").hide();
        }
    });

    $("#bt-next-img").on('click', function () {
        $("#bt-previous-img").show();
        srcImageShow = $(getImage()).next().attr('src');
        $("#one-img").attr("src", srcImageShow);
        indexImage++;
        testLast();
    });

    $("#bt-previous-img").on('click', function () {
        $("#bt-next-img").show();
        srcImageShow = $(getImage()).prev().attr('src')
        $("#one-img").attr("src", srcImageShow);
        indexImage--;
        testFirst();
    });

    function getImage() {
        return $('.images img[src="' + srcImageShow + '"]');
    }

    function testLast() {
        if (indexImage == maxIndex - 1) {
            $("#bt-next-img").hide();
        }
    }

    function testFirst() {
        if (indexImage == 0) {
            $("#bt-previous-img").hide();
        }
    }

});
