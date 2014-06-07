// ==UserScript==
// @name      New Google Logo
// @include   http://www.google.*
// @exclude   http://www.google.com/*
// ==/UserScript==

(function() {
	var logo = document.getElementById("logo");
	logo.style.background = 'url("http://www.google.com/images/srpr/logo1w.png") no-repeat scroll 0 0 transparent';
})();