// MENU RESPONSIVE

$(".menu-btn").on("click", function () {
    $(".menu").slideToggle();
    $(this).toggleClass("abierto");

})

$(".menu a").on("click", function() {
    $(".menu").slideUp();
    $(".menu-btn").removeClass("abierto");
})


// COMPORTAMIENTO DEL HEADER

let ultimoScroll = 0;

$(window).on("scroll", function() {
    let scrollActual = $(this).scrollTop();

    if (scrollActual > 30) {
        $(".cabecera_normal").addClass("scrolled");
    } else {
        $(".cabecera_normal").removeClass("scrolled");
        $(".cabecera_normal").removeClass("oculto");
    }

    if (scrollActual > 650) { 
        
        if (scrollActual > ultimoScroll) {
            $(".cabecera_normal").addClass("oculto");
        } else {
            $(".cabecera_normal").removeClass("oculto");
        }
    }

    ultimoScroll = scrollActual;
});



