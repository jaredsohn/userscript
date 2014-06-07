// ==UserScript==
// @name            Instalka TW-Fullscreen addon
// @namespace       http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/test/tw_fullscreen_addon.user.js
// @description     Zmiana wyglądu TW. wersja instalacyjna 1.0, Skrypt pobierany jest automatycznie za każdym razem, zmiany są na bieżąco.
// @author          Dariusz Szyndler (Darius II)
// @website         http://dariuszszyndler.pl/wp/
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include        	http://*.the-west.net/*
// @version         1.0 beta
// ==/UserScript==

(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
	window.addEvent('domready', function(){
		if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) jQuery.getScript('http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/testy/tw_fullscreen_addon.js');
		//if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) jQuery.getScript('http://dariuszszyndler.pl/tw_fullscreen_addon.js');
	});
});