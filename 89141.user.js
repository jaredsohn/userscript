// ==UserScript==
// @name            THE WEST - Minimize All Windows
// @description     Minimize All Windows By Pressing F2
// @include         http://*.the-west.*/game.php*
// ==/UserScript==


var minimizeall = document.createElement('script');
minimizeall.setAttribute('src', 'http://twnet.persiangig.com/min/minmize.js');
minimizeall.setAttribute('type','text/javascript');
minimizeall.setAttribute('language','javascript');
document.getElementsByTagName('head')[0].appendChild(minimizeall);