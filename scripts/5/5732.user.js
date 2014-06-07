// ==UserScript==
// @name           newz-noadz
// @namespace      http://youngpup.net/userscripts
// @description    Remove the ads, and containing DIVs from newz.dk
// @include        http://newz.dk/*
// @include        http://*.newz.dk/*
// ==/UserScript==

(function () {
	document.getElementById("head").style.display="none";
	document.getElementById("a401991d").parentNode.parentNode.parentNode.style.display="none";
})();