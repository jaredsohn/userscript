// ==UserScript==
// @name		RiotPixels - GoTop!
// @namespace		RiotPixels
// @icon		http://riotpixels.com/forums/favicon.ico
// @description		Жесто закрепляет кнопку "вверх" в левом нижнем углу экрана
// @author		Kleho
// @version		0.0.3
// @date		2013-08-29
// @include		http://riotpixels.com/forums/*
// ==/UserScript==

if (/http:\/\/riotpixels.com\/forums\//.test(window.location.href)) {

	var button = document.getElementById('backtotop');

	button.style.position	= 'fixed';
	button.style.bottom	= '10px';
	button.style.left	= '20px';
	button.style.top	= 'inherit';

}