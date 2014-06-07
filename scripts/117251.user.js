// ==UserScript==
// @name           Modificar url by Falk
// @namespace      http://es-es.facebook.com/www_to_es-es
// @description    Saltarse restricciones del proxy basat en Modificar_url_by_Alex http://userscripts.org/scripts/show/113475
// @include        http://www.facebook.com/*
// @include        http://es-es.facebook.com/*
// @include        https://www.facebook.com/*
// @include        https://es-es.facebook.com/*
// ==/UserScript==
/*
*	lluny de la perfeccio mica en mica intentem millorar entre tots la comoditat a la hora de navegar darrera de un proxy.
*/
var facel = document.URL;
if (facel.substring(7,10)=="www" || facel.substring(8,11)=="www"){
	document.location = facel.replace("www", "es-es");
}
var facelink = document.links;
for (i=0; i<facelink.length; i++){
	facel = facelink[i].href;
	facel = facel.replace("www", "es-es");
	facelink[i].href = facel;
}
//alert(i);		quants enllaços ha reescrit.