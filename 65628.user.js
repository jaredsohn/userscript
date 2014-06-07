// ==UserScript==
// @name           Download now! for hack-home
// @namespace      http://www.mcodina.com.ar
// @include        http://www.hack-home.net/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// CONTROLAMOS LA VERSION!
// version                     1.2 13 Ene 2009
var local_version = new Number(1.2);

//alert("Actualizar");
GM_xmlhttpRequest({
	method: "GET",
	url: 'https://docs.google.com/Doc?docid=0Ac34gGCiSVRGZGNqNmt3OG5fMTZmZHQ3NzNjOQ',
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
			location.replace("http://userscripts.org/scripts/source/65628.user.js");
		}
	}
});
// FIN CONTROL DE VERSIÓN!!
var links = $('a.x');
var cant = links.length;
var i;
for(i=0;i<cant;i++){
	links[i].href = links[i].href + "&Type=Down";
	links[i].target = "_self";
}