$(document).ready(function () {

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

});