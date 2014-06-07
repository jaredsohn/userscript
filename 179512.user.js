// ==UserScript==
// @name			1er Autopista Central [QA Version]
// @namespace		http://userscripts.org/scripts/show/178992
// @version			1.3
// @description		Primera Parte del Robo del Siglo
// @match			http://www.autopistacentral.cl/publico/consultaInfracciones*
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

$("#recaptcha_response_field").keyup(function(e){
	if(e.keyCode == 13) {
		var catchap = $(this).val();
        var pat = $("#sInput").val();
        if( ( $.trim( catchap ) != "" ) && ( $.trim( pat ) ) )
            $("#form1").submit();
	}
});

// load jQuery and execute the main function
addJQuery(main);

var url = $(location).attr('href');
var datos = url.split('?');
datos = datos[1].split('&');
var patente = datos[0];
var solicitud = datos[1];

$("#sInputRadio1").prop("checked", true);
$("#sInput").val( patente );
var action = $("#form1").attr("action");
$("#form1").attr("action", action+"?"+patente+"&"+solicitud)

$("#recaptcha_response_field").focus();