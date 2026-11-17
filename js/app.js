// [GENERAL] MENU RESPONSIVE

$(".menu-btn").on("click", function () {
    $(".menu").slideToggle();
    $(this).toggleClass("abierto");

})

$(".menu a").on("click", function() {
    $(".menu").slideUp();
    $(".menu-btn").removeClass("abierto");
})


// [GENERAL] COMPORTAMIENTO DEL HEADER

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


// [GENERAL] ACORDEON

$(".acordeon__titulo").on("click", function() {
    var contenido = $(this).next();

    $(".acordeon__contenido").not(contenido).slideUp();
    $(".acordeon__titulo").not(this).removeClass("abierto");

    contenido.slideToggle();
    $(this).toggleClass("abierto");

})


// [GENERAL] CARRITO

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


// 7. IR AL FORMULARIO
$botonComprar.on('click', function (e) {
    e.preventDefault();

    if (carrito.length === 0) return;

    sessionStorage.setItem('carritoStiletto', JSON.stringify(carrito));
    window.location.href = 'formulario2.html';
});



// [GENERAL] FORMULARIO CARRITO

$(document).ready(function () {

    if ($('#checkout-lista-productos').length) {
        var carritoGuardado = sessionStorage.getItem('carritoStiletto');
        var productos = carritoGuardado ? JSON.parse(carritoGuardado) : [
            { nombre: "Sweet Junk", cantidad: 1, precio: 56 },
            { nombre: "Acid Garden", cantidad: 1, precio: 58 }
        ];

        function renderizarResumenCheckout() {
            var htmlProductos = '';
            var subtotal = 0;

            productos.forEach(function (prod) {
                var totalProd = prod.precio * prod.cantidad;
                subtotal += totalProd;
                
                htmlProductos += `
                    <div class="resumen-item-producto">
                        <div>
                            <strong>${prod.nombre}</strong>
                            <p class="resumen-item-cantidad">${prod.cantidad} PIEZA${prod.cantidad > 1 ? 'S' : ''}</p>
                        </div>
                        <strong>${totalProd.toFixed(2)} EUR</strong>
                    </div>
                `;
            });

            $('#checkout-lista-productos').html(htmlProductos);
            $('#ck-subtotal').text(subtotal.toFixed(2) + ' EUR');
            
            calcularTotalFinal(subtotal);
        }

        function calcularTotalFinal(subtotal) {
            var costoEnvio = parseFloat($('input[name="metodo-envio"]:checked').val()) || 5.00;
            $('#ck-envio').text(costoEnvio.toFixed(2) + ' EUR');

            var totalConEnvio = subtotal + costoEnvio;

            var codigo = ($('#input-cupon-checkout').val() || '').trim().toUpperCase();
            if (codigo === 'BIENVENIDA') {
                var descuento = subtotal * 0.10;
                $('#ck-monto-descuento').text('-' + descuento.toFixed(2) + ' EUR');
                $('#ck-fila-descuento').show();
                totalConEnvio -= descuento;
            } else {
                $('#ck-fila-descuento').hide();
            }

            $('#ck-total').text(totalConEnvio.toFixed(2) + ' EUR');
        }

        $('input[name="metodo-envio"]').on('change', function () {
            var subtotal = parseFloat($('#ck-subtotal').text()) || 0;
            calcularTotalFinal(subtotal);
        });

        $('#input-cupon-checkout').on('input', function () {
            var subtotal = parseFloat($('#ck-subtotal').text()) || 0;
            calcularTotalFinal(subtotal);
        });

        $('#btn-finalizar-checkout').on('click', function () {
            var email = $('#ck-email').val();
            var tarjeta = $('#ck-tarjeta').val();

            if (!email || !tarjeta) {
                alert('Por favor, completa los campos obligatorios de contacto y pago.');
                return;
            }

            alert('¡Pedido realizado con éxito! Gracias por confiar en Stiletto.');
            sessionStorage.removeItem('carritoStiletto');
            window.location.href = 'index.html';
        });

        renderizarResumenCheckout();
    }
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
