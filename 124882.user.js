// ==UserScript==
// @name           pular parte de oferta de compra de fichas
// @namespace      mezb
// @description    jogatina.com
// @include        https://www.jogatina.com/billing/*
// ==/UserScript==


if(window.location.href.match("jogatina.com/billing/buy")) {

	botao = document.getElementById('voltar').innerHTML;
	window.location.replace(botao.slice(botao.indexOf('http'),botao.lastIndexOf('"')));

} else {

	botao = document.getElementById('voltar-home').innerHTML;
	window.location.replace(botao.slice(botao.indexOf('http'),botao.lastIndexOf('"')));

}