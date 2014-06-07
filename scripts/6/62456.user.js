// ==UserScript==
// @name           Direct ATDHE.net streams
// @description    Gets you directly to the stream
// @version        1.0
// @author         Joel calado
// @namespace      http://www.joelcalado.com
// @include        http://*.atdhe.net/*
// ==/UserScript==

void(function() {

if (typeof contentWindow != 'undefined') {
	unsafeWindow = contentWindow; // google chrome
} else if (typeof unsafeWindow != 'undefined') {
	// firefox
} else {
	unsafeWindow = window; // opera + safari?
}

unsafeWindow.newwindow = function newwindow(url, num) {
	window.location.href = url;
}

var embeds = document.getElementsByTagName("embed");
for (var i = 0; i < embeds.length; i++) {
  var source = embeds[i].src;

 //document.body.innerHTML = '<a href="' + source + '">' + source + '</a>';
 window.location.href = source;
}



	





})();