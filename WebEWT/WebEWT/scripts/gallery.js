$(document).ready(function () {

    var checkboxExpansion = $("input:checkbox");
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
        var arrayImages = data;
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
        var $imagesGallery = $(".images").find("img");
        $($imagesGallery).hide();
        for (var i = 0; i < checkboxExpansion.length; i++) {
            if ($(checkboxExpansion[i]).attr('checked')) {
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

    $("#bt-download").click(function () {
        $("#bt-download").attr("download", srcImageShow);
    });

    $("#bt-delete").click(function (e) {
        $(".question").show();
    });

    $(".bt-yes").click(function () {
        $.ajax({
            url: "/Image/DeleteImage",
            type: 'POST',
            data: {
                nameImage: srcImageShow.substring(srcImageShow.lastIndexOf("/") + 1)
            },
            success: function (data) {
                console.log(checkboxExpansion);
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

    $(".bt-no").click(function () {
        $(".question").hide();
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
