// ==UserScript==
// @name           UTN FRRe: BiblioVirtual - Indice Fix
// @namespace      http://biblio.frre.utn.edu.ar/bibliodigital/
// @description    Soluciona problemas de presentación y comportamiento en navegadores distintos de IE al visualizar el índice de un libro.
// @version	       1.1
// @author		   Sebastián J. Seba
// @include        http://biblio.frre.utn.edu.ar/bibliodigital/ver_indice.asp?*
// @downloadURL    https://userscripts.org/scripts/source/98328.user.js
// @updateURL      https://userscripts.org/scripts/source/98328.meta.js
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
	$("html body div table tbody tr td:nth-child(2) font a.link").attr({'href': 'javascript:void()'});
	$("html body div table tbody tr td:nth-child(2) font a.link").click(function(){window.close()});
	$("html body div table tbody tr td:nth-child(3) a").attr({'href': 'javascript:void()'});
	$("html body div table tbody tr td:nth-child(3) a").click(function(){
		window.parent.indice.focus();
		window.print();
	});
}

addJQuery(main);