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

// [VISTA] ACORDEON


$(".acordeon__titulo").on("click", function() {
    var contenido = $(this).next();

    $(".acordeon__contenido").not(contenido).slideUp();
    $(".acordeon__titulo").not(this).removeClass("abierto");

    contenido.slideToggle();
    $(this).toggleClass("abierto");

})


// [VISTA] CARRUSEL

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


// CARRITO

//1. DATOS Y ELEMENTOS 
var MAXIMO_POR_TIPO = 10;       
var carrito = [];         

var $listaCarrito = $('#lista-carrito');
var $totalTexto = $('#total');
var $botonComprar = $('#boton-comprar');

var $btnDecrementarVista = $('#decrementar');
var $btnIncrementarVista = $('#incrementar');
var $numeroVista = $('.vista-info .numero');
var $btnReservaPrincipal = $('.vista-info .btn-reserva');

var $iconoCarrito = $('a[href="#carrito"]');
var $carritoMenu = $('#carrito-menu');
var $botonCerrarCarrito = $('.cerrar-carrito');

// Convierte un número en precio con formato español: 12.5 → "12,50 €"
function formatearPrecio(numero) {
    return numero.toFixed(2).replace('.', ',') + ' €';
}


//2. CÁLCULO DEL TOTAL
function actualizarCarrito() {
    var subtotal = 0;
    var htmlCarrito = '';

    if (carrito.length === 0) {
        $listaCarrito.html('<p style="font-family: var(--fuente-body); font-size: 13px;">Tu carrito está vacío.</p>');
        $totalTexto.text('0,00 €');
        $botonComprar.prop('disabled', true);
        return;
    }

    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var subtotalProducto = producto.precio * producto.cantidad;
        subtotal = subtotal + subtotalProducto;

        htmlCarrito = htmlCarrito +
            '<div class="carrito-item" data-index="' + i + '">' +
                '<div class="carrito-item-image">' +
                    '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
                '</div>' +
                '<div class="carrito-item-info">' +
                    '<h4>' + producto.nombre + '</h4>' +
                    '<span class="precio-item">' + formatearPrecio(subtotalProducto) + '</span>' +
                    '<div class="cantidad-selector">' +
                        '<button type="button" class="btn-cantidad-carrito decrementar" data-index="' + i + '">-</button>' +
                        '<span class="numero-carrito">' + producto.cantidad + '</span>' +
                        '<button type="button" class="btn-cantidad-carrito incrementar" data-index="' + i + '">+</button>' +
                    '</div>' +
                    '<button type="button" class="btn-remove" data-index="' + i + '">REMOVE</button>' +
                '</div>' +
            '</div>';
    }

    $listaCarrito.html(htmlCarrito);
    $totalTexto.text(formatearPrecio(subtotal));
    $botonComprar.prop('disabled', false);

    conectarBotonesItemCarrito();
}


// 3. ACCIONES DEL CARRITO 

function conectarBotonesItemCarrito() {
    var $botonesIncrementar = $listaCarrito.find('.incrementar');
    var $botonesDecrementar = $listaCarrito.find('.decrementar');
    var $botonesRemover = $listaCarrito.find('.btn-remove');

    $botonesIncrementar.on('click', function () {
        var index = parseInt($(this).attr('data-index'), 10);
        if (carrito[index].cantidad < MAXIMO_POR_TIPO) {
            carrito[index].cantidad = carrito[index].cantidad + 1;
            actualizarCarrito();
        }
    });

    $botonesDecrementar.on('click', function () {
        var index = parseInt($(this).attr('data-index'), 10);
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad = carrito[index].cantidad - 1;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    });

    $botonesRemover.on('click', function () {
        var index = parseInt($(this).attr('data-index'), 10);
        carrito.splice(index, 1);
        actualizarCarrito();
    });
}


// 4. AÑADIR PRODUCTOS AL CARRITO

$btnReservaPrincipal.on('click', function () {
    var nombre = $('.vista-info h2').text().trim();
    var precioTexto = $('.vista-info > .info-text > p:first').text().trim();
    var precio = parseFloat(precioTexto) || 56;
    var imagen = $('.vista-fotos-a img:first').attr('src');
    var cantidad = parseInt($numeroVista.text(), 10) || 1;

    var encontrado = false;

    $.each(carrito, function (index, item) {
        if (item.nombre === nombre) {
            item.cantidad = item.cantidad + cantidad;
            encontrado = true;
            return false; 
        }
    });

    if (!encontrado) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: cantidad
        });
    }

    actualizarCarrito();
    $carritoMenu.addClass('activo');
});

var $botonesAgregarComplementos = $('.producto-card .btn-add-to-cart');

$botonesAgregarComplementos.on('click', function () {
    var $card = $(this).closest('.producto-card');
    var nombre = $card.find('h3').text().trim();
    var precioTexto = $card.find('.product-price').text().trim();
    var precio = parseFloat(precioTexto) || 0;
    var imagen = $card.find('img').attr('src');

    var encontrado = false;


    $.each(carrito, function (index, item) {
        if (item.nombre === nombre) {
            item.cantidad = item.cantidad + 1;
            encontrado = true;
            return false; 
        }
    });

    if (!encontrado) {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    actualizarCarrito();
    $carritoMenu.addClass('activo');
});


// 5. CONTROLES DEL CONTADOR

if ($btnIncrementarVista.length && $btnDecrementarVista.length && $numeroVista.length) {
    $btnIncrementarVista.on('click', function () {
        var cantidadActual = parseInt($numeroVista.text(), 10);
        if (cantidadActual < MAXIMO_POR_TIPO) {
            $numeroVista.text(cantidadActual + 1);
        }
    });

    $btnDecrementarVista.on('click', function () {
        var cantidadActual = parseInt($numeroVista.text(), 10);
        if (cantidadActual > 1) {
            $numeroVista.text(cantidadActual - 1);
        }
    });
}


// 6. ABRIR Y CERRAR EL CARRITO

if ($iconoCarrito.length) {
    $iconoCarrito.on('click', function (e) {
        e.preventDefault();
        $carritoMenu.toggleClass('activo');
    });
}

if ($botonCerrarCarrito.length) {
    $botonCerrarCarrito.on('click', function () {
        $carritoMenu.removeClass('activo');
    });
}

actualizarCarrito();
