// ==UserScript==
// @name           TPB Search Title
// @namespace      http://www.ronaldtroyer.com/
// @description    Changes the title bar on the pirate bay to whatever you are searching for.
// @include        http://thepiratebay.org/search/*
// ==/UserScript==

var title = document.getElementsByTagName('input');
for (i=0; i<title.length; i++) {
	var thistitle = title[i].value;
	if (title[i].title.match(/\Pirate Search/)) {
		thistitle = thistitle.replace(/\<[^\>]*\>/g, ''); // Remove HTML tags
		thistitle = thistitle.replace(/\[[^\]]*\]/g, ''); // Remove anything within square brackets
		thistitle = thistitle.replace(/\      /, '');	// Remove Septuple Space at beginning
		thistitle = thistitle.replace(/\&amp;/, 'and');	// Replace ampersands with the word AND
		headerText = thistitle;
		document.title = "TPB - " + headerText;
	}
}