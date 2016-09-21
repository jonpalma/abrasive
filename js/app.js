$(window).scroll(function () {
    if ($(window).scrollTop() >= '80' && !$('.navbar').hasClass('navbar-fixed-top')) {
        $('.navbar').addClass('navbar-fixed-top');
    } else if ($(window).scrollTop() < '80' && $('.navbar').hasClass('navbar-fixed-top')) {
        $('.navbar').removeClass('navbar-fixed-top');
    }
});