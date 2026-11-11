// MENU RESPONSIVE

$(".menu-btn").on("click", function () {
    $(".menu").slideToggle();
    $(this).toggleClass("abierto");

})

$(".menu a").on("click", function() {
    $(".menu").slideUp();
    $(".menu-btn").removeClass("abierto");
})


// TRANSICIÓN DEL HEADER
$(window).on("scroll", function() {
    if ($(window).scrollTop() > 30) {
        $(".cabeceranormal").addClass("scrolled");
    } else {
        $(".cabeceranormal").removeClass("scrolled");
    }
});