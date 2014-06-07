// ==UserScript==
// @name 		Script2
// @namespace 		http://userscripts.org/
// @description 	addons
// @author 		Andrei
// @include 		http://*.the-west.*/game.php*
// @exclude 		file://*
// @version		1.0.2
// @website 		http://vk.com/
// ==/UserScript==

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://userscripts.org/scripts/source/139180.user.js';
document.getElementsByTagName('head')[0].appendChild(script); 

