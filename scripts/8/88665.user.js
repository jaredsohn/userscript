// ==UserScript==
// @name          Kannada Page Encoding
// @namespace     http://userscripts.org/scripts/show/88665
// @description	  Sets Kannada encoding
// @include       http://reddit.com/*
// @include       http://*.reddit.com/*
// ==/UserScript==

document.getElementsByTagName("html")[0].setAttribute("lang", "kn");