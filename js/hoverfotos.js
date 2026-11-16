
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

