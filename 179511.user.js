// ==UserScript==
// @name			2da Autopista Central [PRO Version]
// @namespace		http://userscripts.org/scripts/show/178993
// @version			1.3
// @description		Segunda Parte del Robo del Siglo
// @match			http://www.autopistacentral.cl/publico/listadoInfracciones*
// @copyright		2013+, Alone
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main(){
    $(document).ready(function() {
        setTimeout(function(){
            $('.fluid_types').triggerHandler('change');
            $('.flow_unit_1').val('lb');
            $('.flow_unit_2').val('sec');
            $('.min_flow').val(1);
            $('.nom_flow').val(2);
            $('.max_flow').val(8);
            $('.min_temp').val(280);
            $('.nom_temp').val(280);
            $('.max_temp').val(280);
            //$('.min_press').val(10);
            //$('.nom_press').val(10);
            //$('.max_press').val(20);
            setTimeout(function(){
                $('#button_calc').triggerHandler('click');
                setTimeout(function(){
                    $('.icon_size').triggerHandler('click');
                },500);
            },500);
        },2000);
    });
}
// load jQuery and execute the main function
addJQuery(main);

var table = $(".contenidos").html();
var badCatchap = $.trim( $("#error").text() );

var url = $(location).attr('href');
var datos = url.split('?');
datos = datos[1].split('&');
var patente = datos[0];
var solicitud = datos[1];

if( badCatchap == "El texto ingresado en el CAPTCHA no es válido." ) {
    var url = "http://www.autopistacentral.cl/publico/consultaInfracciones?"+patente+"&"+solicitud+"&catchap";
	$(location).attr( "href", url );
} else {
    $.ajax({
        type: "POST",
        url: "http://www.autofact.cl/pmapro/index.php/autopistas/saveAutopistaCentral/",
        data: { patente: patente, solicitud: solicitud, dato: table }
    }).done(function( msg ) {
        console.log( msg );
        window.close();
    }).fail(function(jqXHR, textStatus) {
        console.log( jqXHR );
        console.log( textStatus );
        window.close();
    });
}