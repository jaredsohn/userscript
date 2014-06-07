// ==UserScript==
// @name           t4e.com.br
// @namespace      http://t4e.com.br
// @description    Corrige problema de css do forum
// @include http://*t4e.com.br/*
// ==/UserScript==
var aStyle = document.getElementsByTagName('link');
for (i=0; i<aStyle.length; i++) {
	if (aStyle[i].media == 'screen, projection') {
		aStyle[i].href = './styles/prosilver/theme/stylesheet.css';
		break;
	}
}
// Mostra botao editar, apagar, quote.
var aSpan = document.getElementsByTagName('span');
for (i=0; i<aSpan.length; i++) {
	if (aSpan[i].innerHTML == 'Edit post' || aSpan[i].innerHTML == 'Delete post' || aSpan[i].innerHTML == 'Reply with quote') {
		aSpan[i].innerHTML = aSpan[i].innerHTML + '&nbsp;';
		aSpan[i].style.display = 'inline';
	}
}