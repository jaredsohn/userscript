// ==UserScript==
// @name           Quitar espera de linkoculto
// @namespace      http://www.mcodina.com.ar
// @description    Quita la espera del sitio linkoculto.com
// @include        http://linkoculto.com/*
// ==/UserScript==

// CONTROLAMOS LA VERSION!
// version                     1.1 03 Ene 2009
var local_version = new Number(1.1);

//alert("Actualizar");
GM_xmlhttpRequest({
	method: "GET",
	url: 'https://docs.google.com/Doc?docid=0Ac34gGCiSVRGZGNqNmt3OG5fMTdtNzl0ZzZkNA',
	headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
	data:'',
	onload:function(result) {
		var res = result.responseText;
		var start_pos = res.indexOf("*Version");
		var stop_pos = res.indexOf("*", start_pos + 1);
		var server_version = new Number(0);
		server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
		if (server_version > local_version){
			alert("Hay una nueva version del script, ahora se le actualizara. Disculpe las molestias");
			location.replace("http://userscripts.org/scripts/source/65632.user.js");
		}
	}
});
// FIN CONTROL DE VERSIÓN!!

document.location.href="javascript:void(x267 = 1)";