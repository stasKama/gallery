$(document).ready(function () {

    var checkboxExpansion = $("input:checkbox");
    var maxIndex;
    var srcImageShow;
    var indexImage;
    var arrayImages;
    
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
            var image = '<img class="cell ' + classImage + '" src="' + arrayImages[i] + '" alt="Can not display"/>'
            $(".images").append(image);
        }
    }
   
    function errorFunc(errorData) {
        alert('Ошибка загрузки');
    }

    $("input:checkbox").on("change", function () {
        arrayImages = [];
        var $imagesGallery = $(".images").find("img");
        $($imagesGallery).hide();
        var arrayExpansionSelected = [];
        for (var i = 0; i < checkboxExpansion.length; i++) {
            if ($(checkboxExpansion[i]).attr('checked')) {
                arrayExpansionSelected.push(($(checkboxExpansion[i]).val()).toString());
            }
        }
        for (var i = 0; i < $imagesGallery.length; i++) {
            var expansion = $($imagesGallery[i]).attr("src").split(".")[1];
            expansion = expansion != 'png' && expansion != 'jpg' ? 'other' : expansion;
            if (arrayExpansionSelected.indexOf(expansion) != -1) {
                $($imagesGallery[i]).show();
                arrayImages.push($($imagesGallery[i]).attr("src"));
            }

        }
    });

    $(document).on('click', '.images img', function () {
        $('html').addClass("scroll-html");
        $(".one-image").show();
        srcImageShow = $(this).attr("src");
        $("#one-img").attr("src", srcImageShow);
        indexImage = arrayImages.indexOf(srcImageShow);
        $("#bt-next-img").show();
        $("#bt-previous-img").show();
        testLast();
        testFirst();
    });

    $("#one-img").click(function () {
        $('html').removeClass("scroll-html");
        $(".one-image").hide();
    });

    $("#bt-download").click(function () {
        $("#bt-download").attr("download", srcImageShow);
    });

    $("#bt-delete").click(function () {
        $(".question").show();
    });

    $("#bt-yes").click(function (e) {
        $.ajax({
            url: "/Image/DeleteImage",
            type: 'POST',
            data: {
                nameImage: srcImageShow.substring(srcImageShow.lastIndexOf("/") + 1)
            },
            success: function (data) {
                arrayImages[arrayImages.indexOf(srcImageShow)] = null;
                arrayImages = arrayImages.filter(function (x) {
                    return x != null;
                });
                $(getImage()).remove();
                $('html').removeClass("scroll-html");
                $(".question").hide();
                $(".one-image").hide();
            },
            error: function (error) {
                alert("Данные не удалены, повторите процедуру после обновления страницы");
            }
        });
        e.preventDefault();
    });

    $("#bt-no").click(function () {
        $(".question").hide();
    });

    $("#bt-next-img").on('click', function () {
        $("#bt-previous-img").show();
        srcImageShow = arrayImages[++indexImage];
        $("#one-img").attr("src", srcImageShow);
        testLast();
    });

    $("#bt-previous-img").on('click', function () {
        $("#bt-next-img").show();
        srcImageShow = arrayImages[--indexImage];
        $("#one-img").attr("src", srcImageShow);
        testFirst();
    });

    function getImage() {
        return $('.images img[src="' + srcImageShow + '"]');
    }

    function testLast() {
        if (indexImage == arrayImages.length - 1) {
            $("#bt-next-img").hide();
        }
    }

    function testFirst() {
        if (indexImage == 0) {
            $("#bt-previous-img").hide();
        }
    }
   
});
