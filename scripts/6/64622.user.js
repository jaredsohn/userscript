// ==UserScript==
// @author         ArcyQwerty
// @name           GVoiceLink
// @namespace      *://*.google.com*;*://*.gmail.com*
// @include        *.google.com;*.gmail.com
// ==/UserScript==
function addVoice(){
	if (document.getElementById("gbar") == null) setTimeout(addVoice, 1000);
	else document.getElementById("gbar").innerHTML = document.getElementById("gbar").innerHTML + '<a href="https://www.google.com/voice" class="gb1 qq" target=_"blank">Voice</a>';
}

addVoice();