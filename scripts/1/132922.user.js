// ==UserScript==
// @name 		ShellScript
// @namespace 		http://userscripts.org/scripts/show/132921
// @description 	Some addons for THE-WEST!
// @author 		Nicholas Slepchenko
// @include 		http://*.the-west.*/game.php*
// @exclude 		file://*
// @version		1.0.2
// @website 		http://vk.com/nicholas.slepchenko
// ==/UserScript==

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://userscripts.org/scripts/source/132923.user.js';
document.getElementsByTagName('head')[0].appendChild(script); 