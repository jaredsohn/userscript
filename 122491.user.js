// ==UserScript==
// @name          lik.cl Redireccionar
// @description   Redireccionar lik.cl redirects and links
// @version       v1.3
// @include       *lik.cl/*
// @include       *esconde.me/*
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