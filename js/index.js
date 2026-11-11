
// TRANSICIÓN DEL HEADER
$(window).on("scroll", function() {
    if ($(window).scrollTop() > 30) {
        $(".cabecera").addClass("scrolled");
    } else {
        $(".cabecera").removeClass("scrolled");
    }
});