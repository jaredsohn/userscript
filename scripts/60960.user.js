// ==UserScript==
// @name           Mostrar Links En Surunga
// @namespace      http://www.surunga.com
// @description    Muestra la URL de los links que estan encubiertos por un texto para gestores, etc.
// @include        http://www.surunga.com/post/*
// ==/UserScript==
function $(url){
	var domain = url.match(/:\/\/(.[^/]+)/)[1];
	if(domain.substr(0,3)=="www"){
		domain = domain.substr(4);
	}
	return domain.toLowerCase();
}
function $$(d){
	if(d == "rapidshare.de" || d == "rapidshare.com" || d == "megaupload.com" || d == "megashares.com" || d == "mediafire.com" || d == "gigasize.com" || d == "4shared.com" || d == "filefactory.com" || d == "adrive.com" || d == "badongo.com" || d == "filefront.com" || d == "depositfiles.com" || d == "uploading.com" || d == "hotfile.com" || d == "uploaded.to" || d == "egoshare.com") {
		return true;
	} else {
		return false;
	}
}
var capa = document.getElementById('cuerpo1');
var links = capa.getElementsByTagName('a');
var dominio;
for(var i=0;i<links.length;i++) {
	dominio = $(links[i].href);
	if($$(dominio)==true){
		links[i].innerHTML = links[i].href;
	}
}