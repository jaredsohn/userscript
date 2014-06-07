// ==UserScript==
// @name           ToLowerCase
// @namespace      David Jo
// @description    Changes text on current page to lower case.
// @include        *
// ==/UserScript==

var elBody = document.getElementsByTagName("body")[0];
elBody.style.textTransform = "lowercase";



