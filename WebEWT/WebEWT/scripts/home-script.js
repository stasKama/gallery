$(document).ready(function () {

    $(window).scroll(function () {
        if ($(document).scrollTop() <= 270) {
            $(".effect-img img").css("margin-top", -($(document).scrollTop()));
        }
    });

    $(".wrapper>div").hide();

    $(".wrapper>h2").click(function () {

        var findArticle = $(this).next();
        var findWrapper = $(this).closest(".wrapper");

        if (findArticle.is(":visible")) {
            findArticle.slideUp("fast");
        }
        else {
            findArticle.slideDown("fast");
        }
    });

    $(".link-heart").click(function () {
        var idItem = $(this).attr("id");
        $.ajax({
            url: "/Home/IncrementCountLike",
            type: 'POST',
            data: {
                idHero: idItem.substring(3)
            },
            success: function (data) {
                var obj = JSON.parse(data);
                ($("#" + idItem).children(".count-like")).text(obj.CountLike);
                $("#" + idItem).css("color", obj.Color);
            },
            error: function (error) {
                alert("Error.");
            }
        });
    });

});