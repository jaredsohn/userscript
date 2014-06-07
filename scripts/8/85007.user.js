// ==UserScript==
// @name           Redireccionar links en Lik.cl
// @namespace      asd
// @description    Redireccionar Automaticamente los links en Lik.cl
// @include        *lik.cl/*
// ==/UserScript==


var Link;
var LinkCont=document.getElementsByTagName('a');

GM_log(LinkCont.length);

for(i=0;i<LinkCont.length;i++){
	GM_log(LinkCont[i].innerHTML)
	if(LinkCont[i].innerHTML=="Continuar Aqui"){
		Link=LinkCont[i].href
	}
}



window.location.href = Link


