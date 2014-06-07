// ==UserScript==
// @name           JSTOR popup blocker
// @namespace      geological-supplies.com
// @description    Blocks T&C pop-up windows
// @include        http://www.jstor.org/*
// @version        1.1 - Re-writes links to completely avoid t&c page
// @version        1.0 - blocks pop-ups, and clicks 'Proceed to PDF' link.

// ==/UserScript==
if (document.getElementById("pdf")) {
	a = document.getElementById("pdf");
	a.setAttribute("onClick", null);
	a.href = a.href.replace(/.*redirectUri=/, "");	
} 

a = document.getElementsByTagName('a');
if (a[0]) {
	for (i = 0; i < a.length; i++) {
		a[i].href = a[i].href.replace('/page/termsConfirm.jsp?redirectUri=', '');
		a[i].setAttribute('onclick', null);
		a[i].setAttribute('target', null);
		if (a[i].innerHTML == 'Proceed to PDF') window.location.href = a[i].href;
	}
}