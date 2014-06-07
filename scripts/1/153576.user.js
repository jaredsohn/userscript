// ==UserScript==
// @name        Autoescuela
// @namespace   autoescuela
// @description Automatiza la realizacionde los tests
// @include     http://www.tuautoescuela.net/test.php*
// @version     3
// @require		http://code.jquery.com/jquery-1.8.2.min.js
// @grant       none
// @date		10/12/2012
// ==/UserScript==

$(document).ready(function(){
	$("body").keypress(function (e) {
		if(e.which == '122' || e.which == '120' || e.which == '99'){
			if(e.which == '122')	$("#resp1").attr('checked', true);	//Tecla 122
			if(e.which == '120')	$("#resp2").attr('checked', true);	//Tecla 120
			if(e.which == '99')		$("#resp3").attr('checked', true);	//Tecla 99
			cambiaRespuesta(); //se aplica la respuesta
			navegarSiguiente();	//a la siguiente pregunta
			
			if($(".preg_botonera").length==$(".botonera_contestada,.botonera_acertada,.botonera_fallada").length){	//estan todas las preguntas contestadas
				corregirTest();
			}
		}
	});
	$("#resp1,#resp2,#resp3").click(function(){
		navegarSiguiente();
		if($(".preg_botonera").length==$(".botonera_contestada").length){
			corregirTest();
		}
	});
});