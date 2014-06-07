// ==UserScript==
// @name           UTN FRRe: BiblioVirtual - Pedir Libro e Imprimir Ticket Fix
// @namespace      http://biblio.frre.utn.edu.ar/bibliodigital/
// @description    Soluciona problemas de presentación y comportamiento en navegadores distintos de IE al realizar el pedido de un libro.
// @version	       1.1
// @author		   Sebastián J. Seba
// @include        http://biblio.frre.utn.edu.ar/bibliodigital/pedir_libro2.asp?*
// @downloadURL    https://userscripts.org/scripts/source/98329.user.js
// @updateURL      https://userscripts.org/scripts/source/98329.meta.js
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.setAttribute("type", "text/javascript");
	script.addEventListener('load', function() {
					var script = document.createElement("script");
					script.textContent = "(" + callback.toString() + ")();";
					document.body.appendChild(script);
					}, false);
  document.body.appendChild(script);
}

function main() {	
	$("html body div table tbody tr td div form table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td:nth-child(3) font input.textBoxVerdana1").click(function(){
		window.open('imprimir_ticket.asp', null, "height=400, width=250, scrollbars=yes, status=yes, toolbar=no, menubar=no, location=no, resizable=yes");
		window.location = "http://biblio.frre.utn.edu.ar/bibliodigital/index.asp";
	});
	
	$("html body div table tbody tr td div form table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr:nth-child(3) td:nth-child(2) font input.textBoxVerdana1").click(function(){
		var nroInv;
		var regexS = "[\\?&]"+ 'nro_inv' +"=([^&#]*)";
		var regex = new RegExp(regexS);
		var tmpURL = window.location.href;
		var results = regex.exec(tmpURL);
		if(results == null)
			nroInv = "";
		else
			nroInv = results[1];
		alert(nroInv);
		window.location = "http://biblio.frre.utn.edu.ar/bibliodigital/cancelar_pedido.asp?nro_inv=" + nroInv;			
	});
	
	$("html body div table tbody tr td div form table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr:nth-child(5) td:nth-child(2) font input.textBoxVerdana1").click(function(){
		window.open('otro_tramite.asp', null, "height=400, width=250, scrollbars=yes, status=yes, toolbar=no, menubar=no, location=no, resizable=yes");
		window.location = "http://biblio.frre.utn.edu.ar/bibliodigital/index.asp";
	});
}

addJQuery(main);