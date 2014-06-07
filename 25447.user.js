// ==UserScript==
// @name           JSTOR popup blocker
// @namespace      geological-supplies.com
// @description    Blocks T&C pop-up windows
// @include        http://www.jstor.org*/*
// @version        2.0 - per 2010 JSTOR redesign
// @version        1.1 - Re-writes links to completely avoid t&c page
// @version        1.0 - blocks pop-ups, and clicks 'Proceed to PDF' link.

// ==/UserScript==
if (document.getElementById("pdf")) {
	a = document.getElementById("pdf");
	a.href = a.href.replace(/.*redirectUri=/, "") + "?&acceptTC=true";
	a.setAttribute("target", "_top");
	a.setAttribute("onClick", "window.location.href = this.href; e.preventDefault()");
        a.removeAttribute("target");	
} else {
a = document.getElementsByTagName('a');
	if (a[0]) {
		for (var i in a) {
			if (a[i].innerHTML == 'Proceed to PDF') window.location.href = a[i].href;
			a[i].href = a[i].href.replace('/page/termsConfirm.jsp?redirectUri=', '');
			a[i].removeAttribute('onclick');
			a[i].removeAttribute('target');
		}
	}
}