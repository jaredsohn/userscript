// ==UserScript==
// @name           Google Buttons and Search Field
// @namespace      none
// @include        http://www.google.*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); .lsb{font-size:12px;height:auto;} .lst{font-size:12px;} .gac_a{font-size:12px;} .gac_b{font-size:12px;} .gac_c{font-size:12px;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
}