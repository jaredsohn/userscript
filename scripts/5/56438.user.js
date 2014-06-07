// ==UserScript==
// @name           MasOportunidades Enlaces Directos
// @namespace      http://www.masoportunidades.com.ar
// @description    Reemplaza enlaces de javascript por enlaces normales, para poder abrirlos en múltiples pestañas.
// @include http://www.masoportunidades.com.ar/*
// ==/UserScript==

var links = document.getElementsByTagName('a');

var cambiarpopup=false;
var popupregexp=/javascript:Popup\('\/([^']*)'/i;

for (i=0; i<links.length; i++)
{
	if(re=links[i].href.match(/javascript:filtrarCategoria\((.*)\)/i)){
		//normal
		if(uri=document.location.href.match(/(.*)\/buscar\/catId-/i)) {
			  links[i].href=uri[0]+re[1]+"-";
		} else
		//buscando keyword
		if(uri=document.location.href.match(/(.*)_/i)) {
				links[i].href=uri[1]+"_categoriaId-"+re[1];
		} else
		links[i].href=document.location.href+"_categoriaId-"+re[1];
		
	}
	//Popup
	if(cambiarpopup)
	if(re=links[i].href.match(popupregexp)){
		if(uri=document.location.href.match(/(https?:\/\/([^\/]*)\/)/i))
			links[i].href=uri[1]+re[1];
	}
}
