// ==UserScript==
// @name          Test Kiddo
// @namespace     http://userscripts.org/users/60643
// @description   Learning...
// @include       http://userscripts.org/users/60643
// ==/UserScript==


$(document).ready(function() {
	$("a").click(function() {
		alert("Hello world!");
	});
});