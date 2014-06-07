// ==UserScript==
// @name			Usuń "Napisz co teraz robisz" z Blipa
// @namespace		http://bartej.blip.pl
// @description		Usuwa formularz "Napisz co teraz robisz"
// @include			http://blip.pl/dashboard*
// @include			http://blip.pl/users/*/dashboard*
// @include			http://www.blip.pl/dashboard*
// @include			http://www.blip.pl/users/*/dashboard*
// @include			http://blip.pl/s/*
// @include			http://blip.pl/dm/*
// @include			http://blip.pl/tags/*
// @include			http://www.blip.pl/s/*
// @include			http://www.blip.pl/dm/*
// @include			http://www.blip.pl/tags/*
// @include			http://www.blip.pl/
// @include			http://www.blip.pl/bliposphere
// @include			http://blip.pl/
// @include			http://blip.pl/bliposphere
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// ==/UserScript==

if(typeof GM_addStyle === "undefined") { 
	GM_addStyle = function(/* String */ styles) {
		var oStyle = document.createElement("style"); 
		oStyle.setAttribute("type", "text\/css"); 
		oStyle.appendChild(document.createTextNode(styles)); 
		document.getElementsByTagName("head")[0].appendChild(oStyle); 
	} 
}

$(document).ready(function() {
	GM_addStyle("#dashboard-input { display:none; }" +
	"#dashboard-loading { display:none; }" +
	".tag { border-width:1px 0; margin:0 1px; padding:0; white-space:nowrap; }" +
	".innerTag { border-width:0 1px; margin:0 -1px; }" +
	".tag, .innerTag { border-style:solid; font-weight:normal; }" +
	".content .tag { white-space:nowrap; }");
});

if (typeof(unsafeWindow) === 'undefined') {
	unsafeWindow = window;
}

var script = document.createElement("script");
script.src = "http://code.jquery.com/jquery-latest.js";
script.type = "text/javascript";
script.addEventListener("load", function() {
	unsafeWindow.jQuery.noConflict();
	jQueryIsReady(unsafeWindow.jQuery);
}, false);

document.getElementsByTagName("head")[0].appendChild(script);
