$(document).ready(function () {

    $(window).scroll(function () {
        if ($(document).scrollTop() > 100) {
            $('.colonum-menu').addClass('fixed');
            $('.scrollup').fadeIn();
        }
        else {
            $('.colonum-menu').removeClass('fixed');
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

});