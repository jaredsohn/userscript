// ==UserScript==
// @name		Freepedia
// @author		Jesse Sheehan
// @match		http://wikipedia.org/*
// @match		http://*.wikipedia.org/*
// @match		https://wikipedia.org/*
// @match		https://*.wikipedia.org/*
// @description	Removes the shit at the top of the page
// ==/UserScript==

document.body.onload = function () {document.getElementById("centralNotice").style.display = "none"};
