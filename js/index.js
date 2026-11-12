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
        $(".cabecera").addClass("scrolled");
    } else {
        $(".cabecera").removeClass("scrolled");
        $(".cabecera").removeClass("oculto");
    }

    if (scrollActual > 650) { 
        
        if (scrollActual > ultimoScroll) {
            $(".cabecera").addClass("oculto");
        } else {
            $(".cabecera").removeClass("oculto");
        }
    }

    ultimoScroll = scrollActual;
});


//CARRUSEL

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

// POLAROIDS
$(document).ready(function() {
    $(".foto-card").draggable({

        containment: "#polaroids", 
        stack: ".foto-card"   
    });
});

