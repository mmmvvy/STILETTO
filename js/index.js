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

// COOKIES 

$(document).ready(function () {

    var cookiesCerradas = false;

    setTimeout(function () {
        if (!cookiesCerradas) {
            $('#stiletto-cookie-banner').addClass('activo');
        }
    }, 1000);

    $('#btn-aceptar-cookies, #btn-rechazar-cookies').on('click', function () {
        cookiesCerradas = true;
        $('#stiletto-cookie-banner').removeClass('activo');
    });
});


// PERFIL

$(document).ready(function () {
    var $iconoPerfil = $('.icono-perfil, a[href="#perfil"], .fa-user').first();

    $iconoPerfil.on('click', function (e) {
        e.preventDefault();
        $('#stiletto-perfil-modal').addClass('activo');
    });

    $('#btn-cerrar-perfil').on('click', function () {
        $('#stiletto-perfil-modal').removeClass('activo');
    });

    $('#stiletto-perfil-modal').on('click', function (e) {
        if ($(e.target).is('#stiletto-perfil-modal')) {
            $(this).removeClass('activo');
        }
    });

    $('#form-registro-rapido').on('submit', function (e) {
        e.preventDefault();
        var email = $('#email-registro').val().trim();
        var password = $('#password-registro').val().trim();

        if (email && password) {
            alert('¡Cuenta creada con éxito! Bienvenid@ a Stiletto.');
            $('#stiletto-perfil-modal').removeClass('activo');
            
            $('#email-registro').val('');
            $('#password-registro').val('');
        }
    });
});

// AOS LIBRERIA
AOS.init({
   duration: 950
});

AOS.init({
  disable: window.innerWidth < 960
});