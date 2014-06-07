// ==UserScript==
// @name           TheWest Minimize all
// @namespace      forestking
// @description		Minimizes all TW-Windows by hitting F2
// @include http://*.the-west.*
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.*
// ==/UserScript==


var minimizeall = document.createElement('script');
minimizeall.setAttribute('src', 'http://forestking5.fo.ohost.de/sonstiges/tw/skripte/js/thewestminimizeall.js');
minimizeall.setAttribute('type','text/javascript');
minimizeall.setAttribute('language','javascript');
document.getElementsByTagName('head')[0].appendChild(minimizeall);