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