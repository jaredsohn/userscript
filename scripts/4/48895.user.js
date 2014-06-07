// ==UserScript==
// @name           Zshare resize
// @description    resize flash window zshare
// @include        http://www.supernovatube.com/*
// @include	   http://www.zshare.net/*
// @author         namit
// ==/UserScript==

unsafeWindow['so'].setAttribute('width', "800");
unsafeWindow['so'].setAttribute('height', "660");
unsafeWindow['so'].addVariable("width","800");
unsafeWindow['so'].addVariable("height","660");
document.getElementById("adaptvDiv").innerHTML = unsafeWindow['so'].getSWFHTML();