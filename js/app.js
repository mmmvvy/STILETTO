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

var pista = $(".carrusel__pista");
var pressons = $(".presson");
var botonNext = $("#siguiente");
var botonPrev = $("#anterior");

var indice = 0;
var totalPressons = pressons.length;
var visibles = 4;

function actualizarCarrusel() {
    var desplazamiento = indice * (100 / visibles);
    pista.css("transform", "translateX(-" + desplazamiento + "%)");
}

botonNext.on("click", function() {
    if (indice < totalPressons - visibles) {
        indice++;
        actualizarCarrusel();
    }
});

botonPrev.on("click", function() {
    if (indice > 0) {
        indice--;
        actualizarCarrusel();
    }
});