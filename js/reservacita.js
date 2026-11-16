
    // [RESERVA1] RESERVA CITA
  
  $(document).ready(function () {

    function actualizarResumenCita() {
        var $servicioSel = $('input[name="servicio"]:checked');
        var $formaSel = $('input[name="forma"]:checked');
        var $larguraSel = $('input[name="largura"]:checked');
        var $artSel = $('input[name="nailart"]:checked');

        var precioServicio = parseFloat($servicioSel.data('precio')) || 0;
        var precioLargura = parseFloat($larguraSel.data('precio-largura')) || 0;
        var precioArt = parseFloat($artSel.data('precio-art')) || 0;
        var totalCita = precioServicio + precioLargura + precioArt;

        $('#resumen-servicio').text($servicioSel.val() || '-');
        $('#resumen-forma').text($formaSel.val() || '-');
        $('#resumen-largura').text($larguraSel.val() || '-');
        $('#resumen-art').text($artSel.val() || '-');
        $('#resumen-total').text(totalCita + ' €');
    }

    if ($('#form-reserva').length) {
        $('#form-reserva input[type="radio"]').on('change', function () {
            actualizarResumenCita();
        });
        actualizarResumenCita();
    }

    $('#btn-siguiente-paso').on('click', function () {
        var datosCita = {
            servicio: $('#resumen-servicio').text(),
            forma: $('#resumen-forma').text(),
            largura: $('#resumen-largura').text(),
            nailart: $('#resumen-art').text(),
            total: $('#resumen-total').text()
        };

        sessionStorage.setItem('citaStiletto', JSON.stringify(datosCita));
        window.location.href = 'reserva2.html';
        });
    }); 



    // [RESERVA2] RESERVA CITA
    
   $(document).ready(function () {

    var $btnFinalizar = $('#btn-finalizar-reserva');
    var fechaSeleccionada = null;
    var horaSeleccionada = null;

  
    var horariosPorFecha = {
        "24/11/2026": { 
            mañana: ["09:00", "10:30"],
            tarde: ["15:00", "16:30"]
        },
        "20/11/2026": { 
            mañana: ["09:00", "10:30"],
            tarde: ["15:00", "16:30"]
        },

        "05/11/2026": { 
            mañana: ["09:00", "10:30"],
            tarde: ["15:00", "16:30"]
        },
        "18/12/2026": {
            mañana: ["10:00", "11:00", "12:30"],
            tarde: ["16:00", "17:30", "19:00"]
        },
        "28/11/2026": {
            mañana: ["09:30", "10:30", "11:30"],
            tarde: ["17:00", "18:00"]
        }
    };

    var horarioPorDefecto = {
        mañana: ["10:00", "12:00", "12:30", "12:40"],
        tarde: ["17:00", "18:30"]
    };

    // 1. Recuperar los datos guardados
    var datosGuardados = sessionStorage.getItem('citaStiletto');
    if (datosGuardados) {
        var cita = JSON.parse(datosGuardados);
        $('#r2-servicio').text(cita.servicio);
        $('#r2-forma').text(cita.forma);
        $('#r2-largura').text(cita.largura);
        $('#r2-art').text(cita.nailart);
        $('#r2-total').text(cita.total);
    }

    // 2. datepicker
    $('#calendario-ui').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: 0,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        firstDay: 1,
        onSelect: function (dateText) {
            fechaSeleccionada = dateText;
            horaSeleccionada = null;
            actualizarFechaHoraResumen();
            renderizarHoras(dateText);
        }
    });

    // 3. horas
    function renderizarHoras(fechaStr) {
        var $gridManana = $('#grid-horas-manana');
        var $gridTarde = $('#grid-horas-tarde');

        $gridManana.empty();
        $gridTarde.empty();

        // Buscar en el objeto o usar el por defecto
        var disponibilidad = horariosPorFecha[fechaStr] || horarioPorDefecto;

        if (disponibilidad.mañana && disponibilidad.mañana.length > 0) {
            disponibilidad.mañana.forEach(function (hora) {
                $gridManana.append('<button type="button" class="btn-hora">' + hora + '</button>');
            });
        } else {
            $gridManana.append('<p style="font-size: 0.85rem; color: #888;">No hay horas</p>');
        }

        if (disponibilidad.tarde && disponibilidad.tarde.length > 0) {
            disponibilidad.tarde.forEach(function (hora) {
                $gridTarde.append('<button type="button" class="btn-hora">' + hora + '</button>');
            });
        } else {
            $gridTarde.append('<p style="font-size: 0.85rem; color: #888;">No hay horas</p>');
        }
    }

    // 4. Seleccionar horas
    $(document).on('click', '.btn-hora', function () {
        $('.btn-hora').removeClass('seleccionado');
        $(this).addClass('seleccionado');

        horaSeleccionada = $(this).text();
        actualizarFechaHoraResumen();
    });

    // 5. Actualizar resumen y botón de confirmar
    function actualizarFechaHoraResumen() {
        if (fechaSeleccionada && horaSeleccionada) {
            $('#fila-resumen-fecha').show();
            $('#r2-fecha-hora').text(fechaSeleccionada + ' - ' + horaSeleccionada);
            $btnFinalizar.prop('disabled', false);
        } else {
            $('#r2-fecha-hora').text('-');
            $('#fila-resumen-fecha').hide();
            $btnFinalizar.prop('disabled', true);
        }
    }

// 6. Confirmar cita final 
    $btnFinalizar.on('click', function () {
        var citaFinal = {
            servicio: $('#r2-servicio').text(),
            forma: $('#r2-forma').text(),
            largura: $('#r2-largura').text(),
            nailart: $('#r2-art').text(),
            fechaHora: $('#r2-fecha-hora').text(),
            total: $('#r2-total').text()
        };

        sessionStorage.setItem('citaStiletto', JSON.stringify(citaFinal));

        window.location.href = 'formulario1.html';
    });

});

$(document).ready(function () {

    // 1. Recuperar los datos 
    var datosGuardados = sessionStorage.getItem('citaStiletto');
    
    if (datosGuardados) {
        var cita = JSON.parse(datosGuardados);
        
        // Rellenar textos del resumen
        $('#r3-servicio').text(cita.servicio || '-');
        $('#r3-forma').text(cita.forma || '-');
        $('#r3-largura').text(cita.largura || '-');
        $('#r3-art').text(cita.nailart || '-');
        
        // Separar fecha y hora 
        if (cita.fechaHora) {
            var partes = cita.fechaHora.split(' - ');
            $('#r3-fecha-resumen').text(partes[0] || '-');
            $('#r3-hora-resumen').text(partes[1] || '-');
        }

        // Asignar precios 
        $('#r3-precio-servicio').text('35 EUR');
        $('#r3-precio-forma').text('0 EUR');
        $('#r3-precio-largura').text('4 EUR');
        $('#r3-precio-art').text('15 EUR');

        // Total
        var totalStr = cita.total ? cita.total.replace('€', '').trim() + ' EUR' : '54 EUR';
        $('#r3-subtotal').text(totalStr);
        $('#r3-total').text(totalStr);
    }

    // Completar Reserva
    $('#btn-completar-reserva').on('click', function () {
        var nombre = $('#r3-nombre').val();
        var email = $('#r3-email').val();
        var tarjeta = $('#r3-tarjeta').val();

        if (!nombre || !email || !tarjeta) {
            alert('Por favor, completa los campos obligatorios de datos y pago.');
            return;
        }

        alert('¡Reserva y pago completados con éxito! Te hemos enviado un email de confirmación.');
        
        // Limpiar sessionStorage y redirigir al inicio
        sessionStorage.removeItem('citaStiletto');
        window.location.href = 'index.html';
    });

    // descuento del 10%
    $('#input-cupon').on('input', function () {
        var codigo = $(this).val().trim().toUpperCase();
        
        // Recuperamos el total original sin descuento 
        var totalOriginalStr = sessionStorage.getItem('totalOriginalStiletto');
        if (!totalOriginalStr) {

            totalOriginalStr = $('#r3-total').text().replace('EUR', '').replace('€', '').trim();
            sessionStorage.setItem('totalOriginalStiletto', totalOriginalStr);
        }
        
        var subtotalNum = parseFloat(totalOriginalStr);

        if (codigo === 'BIENVENIDA') {

                    var descuento = subtotalNum * 0.10;
                    var totalConDescuento = subtotalNum - descuento;
                    
                    $('#monto-descuento').text('-' + descuento.toFixed(2) + ' EUR');
                    $('#fila-descuento').show();
                    
                    $('#r3-total').text(totalConDescuento.toFixed(2) + ' EUR');
                } else {

                    $('#fila-descuento').hide();
                    $('#monto-descuento').text('-0.00 EUR');
                    $('#r3-total').text(subtotalNum.toFixed(2) + ' EUR');
                }
            });

});