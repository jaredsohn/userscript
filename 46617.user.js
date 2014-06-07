// ==UserScript==
// @name          Club Penguin fullscreen
// @namespace     http://play.clubpenguin.com/?fullscreen
// @description   Extends Club Penguin to fullscreen
// @include       http://play.clubpenguin.com/?Fullscreen
// ==/UserScript==

var elmDeleted = document.getElementById("affiliateheaderforcp");
elmDeleted.parentNode.removeChild(elmDeleted);
var elmDeleted = document.getElementById("affiliatefooter");
elmDeleted.parentNode.removeChild(elmDeleted);
var elmExtra = document.getElementById('bigscreen');
elmReplaced.innerHTML = '<html><body><embed type="application/x-shockwave-flash" src="http://media1.clubpenguin.com/play/v2/load.swf?a=0" name="plugin" width="100%" height="100%">';