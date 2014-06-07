// ==UserScript==
// @version		1.05
// @author		TheBronx
// @date		2011-12-27
// @name		da-no-publi
// @namespace	da-no-publi
// @description	Script para quitar la publi de deviantart
// @include		http://*.deviantart.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function main() {
	quitarBannerHorizontal();
	quitarCuadradoDerecho();
}

function quitarBannerHorizontal() {
	$('.ad-blocking-makes-fella-confused').hide();
}

function quitarCuadradoDerecho() {
	$('a.subbyCloseX').each(function () {
		$(this).parent('div').hide();
	});
}

window.addEventListener('load',main,true);