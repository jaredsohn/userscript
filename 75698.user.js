// ==UserScript==
// @name           TheWestAccesskeys
// @description		Scroll card with the arrow keys. Open several TW-Windows by accesskeys
// @namespace      forestking
// @include http://*.the-west.*
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.*
// ==/UserScript==


var accesskeys = document.createElement('script');
accesskeys.setAttribute('src', 'http://forestking5.fo.ohost.de/sonstiges/tw/skripte/js/thewestacceskeys.js');
accesskeys.setAttribute('type','text/javascript');
accesskeys.setAttribute('language','javascript');
document.getElementsByTagName('head')[0].appendChild(accesskeys);