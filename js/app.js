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

    if (scrollActual > 40) {
        $(".cabecera_normal").addClass("scrolled");
    } else {
        $(".cabecera_normal").removeClass("scrolled");
        $(".cabecera_normal").removeClass("oculto");
    }

    if (scrollActual > 430) { 
        
        if (scrollActual > ultimoScroll) {
            $(".cabecera_normal").addClass("oculto");
        } else {
            $(".cabecera_normal").removeClass("oculto");
        }
    }

    ultimoScroll = scrollActual;
});




// [SERVICIOS] HOVER FOTOS 

$(document).ready(function() {
    var fotoInicial = $("#foto-servicio").attr("src");

    $(".servicio-item").on("mouseenter", function() {
        var nuevaFoto = $(this).data("foto");
        
        $("#foto-servicio").fadeOut(120, function() {
            $(this).attr("src", nuevaFoto).fadeIn(150);
        });
    });

    $(".servicios-a").on("mouseleave", function() {
        $("#foto-servicio").fadeOut(120, function() {
            $(this).attr("src", fotoInicial).fadeIn(150);
        });
    });
});


// [PRESSON] FILTROS

$(document).ready(function() {
    $('.filtro').on('click', function() {

        $('.filtro').removeClass('is-activo');
        $(this).addClass('is-activo');

        var tipoSeleccionado = $(this).attr('data-tipo');

        $('.pressons').each(function() {
            var tipoCard = $(this).attr('data-tipo'); 
            if (tipoSeleccionado === 'todos' || tipoCard.includes(tipoSeleccionado)) {
                $(this).show(); 
            } else {
                $(this).hide(); 
            }
        });
    });
});