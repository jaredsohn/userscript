// ==UserScript==
// @name           4chan Facebook Faggotry
// @namespace      Anon
// @description    Removes the Facebook tick
// @include        http://boards.4chan.org/*
// ==/UserScript==


Array.forEach(document.getElementsByTagName("INPUT"), function(input) {
	if (input.type.toLowerCase()=="checkbox") {
		input.checked = false;
		input.disabled = false;
	}
});