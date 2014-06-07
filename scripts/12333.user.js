// ==UserScript==
// @name           Use Current Window for Blogger Links
// @namespace      Burglish.com
// @include        http://*.blogspot.com/*
// ==/UserScript==

ttag = document.getElementsByTagName("A");

for (i = 0; i < ttag.length; i++) {
	ttag[i].removeAttribute("target");
}
