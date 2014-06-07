// ==UserScript==
// @name			TheWestWindowManager
// @description		Lists all "The West"-windows which are currently opened and brings one to top by clicking on the link.
// @namespace		forestking
// @include http://*.the-west.*
// @exclude http://*.the-west.de/forum*
// @exclude http://forum.the-west.* 
// ==/UserScript==

var windowmanager = document.createElement('script');
windowmanager.setAttribute('src', 'http://forestking5.fo.ohost.de/sonstiges/tw/skripte/js/thewestwindowmanager.js');
windowmanager.setAttribute('type','text/javascript');
windowmanager.setAttribute('language','javascript');
document.getElementsByTagName('head')[0].appendChild(windowmanager);