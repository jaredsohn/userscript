// ==UserScript==
// @name           T! Titulo. Validador de titulos Taringa!
// @namespace      T! Titulo. Validador de titulos Taringa!
// @description    Validador de titulo para posts de taringa
// @include        http://taringa.net/agregar/
// ==/UserScript==

window.addEventListener("load", function(e) {
	var doc = document;
	var input = doc.body.getElementsByClassName("agregar titulo")[0];
	
	input.addEventListener("keyup", function(){
		var MAY = input.value.replace(/[^A-Z]/g, "").length;
		var MIN = input.value.replace(/[^a-z]/g, "").length;
		var percent = Math.round(MAY * 100 / (MIN + MAY));
		
		var tituloB = doc.body.getElementsByTagName("form")[0].getElementsByTagName("b")[0];
		
		
		if( percent > 25 && input.value.length > 4 ){
			input.style.background = "#FF6666";
			tituloB.innerHTML = "Titulo: [Contiene mas del 25% en mayusculas]";
		}
		else if( percent > 20 && input.value.length > 4 ){
			input.style.background = "#FFFFAA";
			tituloB.innerHTML = "Titulo: [+20% mayusculas]";
		}
		else{
			input.style.background = "#FFF";
			tituloB.innerHTML = "Titulo:";
		}
	}, false);
}, false);