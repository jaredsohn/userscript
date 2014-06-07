// ==UserScript==
// @name           Facepunch -- Old Style Ratings
// @namespace      http://greasemonkey.megagamer.net/
// @description    Replaces box with downs, and :P face with :v: face.
// @include        http://www.facepunch.com/showthread.php?t=*
// @include        http://www.facepunch.com/threads/*
// ==/UserScript==
if (typeof(google) == 'undefined') {ChromeKludge();}
else {
	// http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + ChromeKludge + ')();'));
	document.head.appendChild(script);
}
function ChromeKludge() {
	var $ = typeof(google) == 'undefined' ? unsafeWindow.jQuery : jQuery
	$('img', '.postrating').each(function() {
		if (this.title == "Dumb") {
			this.src = "/fp/emoot/downs.gif";
	});
	$('img', '.rating_results').each(function() {
		if (this.title == "Dumb") {
			this.src = "/fp/emoot/downs.gif";
	});
}