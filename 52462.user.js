// ==UserScript==
// @name		Foros mi@ sin publicidad
// @namespace		DJMeu
// @description		Script para quitar la banda superior de publicidad de los foros de mi@
// @include		http://*.mforos.com/*
// @version		1.1
// ==/UserScript==
//-------------------------------------------------------------------------------------------//

version='1.1';
scripturl='http://userscripts.org/scripts/source/52462.user.js';
scripturl2='http://userscripts.org/scripts/show/52462';
scriptname="Foros mi@ sin publicidad";
//-------------------------------------------------------------------------------------------//

GM_registerMenuCommand(scriptname+ ': Ir a la p\u00e1gina del script', scriptpage);
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/source/52462.meta.js',
	onload: function(resp) {
	resp.responseText.match(/@version\s+([\d.]+)/);
		updatedversion = RegExp.$1;
		if (version <= updatedversion){
			if (version != updatedversion){
				if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
					document.location.href = scripturl
				}
			}
		}
	}
});
function scriptpage(evt) document.location.href = scripturl2;
//-------------------------------------------------------------------------------------------//

publicidad=document.getElementById("matb_adszone");
publicidad.style.display="none";
publicidad.style.visibility="hidden";