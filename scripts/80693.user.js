// ==UserScript==
// @name		Rétablissement de Micka sur /mika/
// @version		1.01
// @description	Enlève la face de Mika pour remettre "Micka"
// @include		http://www.underfoule.net/mika/*
// @author		Anon
// @license		GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

addEventListener('load', function (e) {
document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.replace(/<img src="mimi.jpg"> /g, 'Micka');
window.status = 'Metro-Kun suce des bites';
}, false);