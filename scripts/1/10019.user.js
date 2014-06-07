// --------------------------------------------------------------------
//
// Este é um script do greasemonkey
//
// Para instala-lo voce necessita do Greasemonkey: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Remove Propaganda UOL mail
// @namespace MAILUOLREMOVEPROPAGANDA
// @description Remove Propaganda do e-mail da UOL
// @include http://mail*.uol.com.br/*
// ==/UserScript==


// --------------------------------------------------------------------
// adicionar CSS as paginas
// --------------------------------------------------------------------
window.addGlobalStyle = function(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('#extra     { display: none; }');
addGlobalStyle('#innermain { width: 100%; left: 0px; }');
addGlobalStyle('#outer     { border-right: 0px; }');