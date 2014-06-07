// ==UserScript==
// @name           JSTOR PDFer
// @namespace      jstor.org/
// @description    Takes you straight to the PDF version of JSTOR articles
// @include        *.jstor.org/view/*
// @exclude        *.pdf*
// @version        2.0 - new JSTOR interface, March 2008
// ==/UserScript==

if (document.getElementById("pdf")) {
	a = document.getElementById("pdf");
	window.location.href = "http://www.jstor.org/" + a.href.replace(/.*redirectUri=/, "");	
}