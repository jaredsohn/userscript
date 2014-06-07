// ==UserScript==
// @name           UTN FRRe: BiblioVirtual - Imprimir Ticket Fix
// @namespace      http://biblio.frre.utn.edu.ar/bibliodigital/
// @description    Soluciona problemas en la presentación y comportamiento en navegadores distintos de IE al imprimir un ticket de pedido.
// @version	       1.1
// @author		   Sebastián J. Seba
// @include        http://biblio.frre.utn.edu.ar/bibliodigital/imprimir_ticket.asp*
// @include        http://biblio.frre.utn.edu.ar/bibliodigital/otro_tramite.asp*
// @downloadURL    https://userscripts.org/scripts/source/98330.user.js
// @updateURL      https://userscripts.org/scripts/source/98330.meta.js
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
	window.print();
	window.close();
}

addJQuery(main);