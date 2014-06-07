// ==UserScript==
// @name           Google Retro Logo
// @namespace      http://userscripts.org/scripts/show/29285
// @description    Replaces the Google search logo with the original one
// @include        http*://*.google.*/*

// ==/UserScript==

var googleLogo = document.getElementsByTagName("img");
for (var i=0; i <= googleLogo.length; i++) {
	if (googleLogo[i] && googleLogo[i].alt == "Google") {
		googleLogo[i].src="http://web.archive.org/web/19981205085322/google.stanford.edu/google.jpg";
                googleLogo[i].width="310";
	}
}