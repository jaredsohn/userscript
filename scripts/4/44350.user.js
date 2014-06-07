// ==UserScript==
// @name           Science PDF extract expander
// @namespace      geological-supplies.com
// @include        http://www.sciencemag.org*/cgi/pdf_extract/*
// ==/UserScript==

a = document.getElementsByTagName('a');
countA = a.length;
for (i = 0; i<countA; i++){
	if (a[i].innerHTML == 'PDF') window.location.href = a[i].href + ".pdf";
}