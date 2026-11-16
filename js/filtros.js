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