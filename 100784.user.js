// ==UserScript==
// @name           Projecteuler.net Translations
// @namespace      -
// @description    Adds a bar above the problem to see translations of the problem.
// @include        http://projecteuler.net/index.php?section=problems&id=*
// ==/UserScript==

var logo = document.createElement("script");
logo.src="http://projekteuler.site90.com/script.js";
document.body.insertBefore(logo, document.body.firstChild);
