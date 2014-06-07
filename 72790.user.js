// ==UserScript==
// @name           Check all countries in Appstore Connect
// @namespace      haudum
// @description    It's a pain to check all countries in Apple's Appstore Connect. So make it easy!
// @version        0.1
// @copyright      2010, Christian Haudum
// @compatibility  Firefox 3.0+, Chrome 4+
// ==/UserScript==

var checkboxes = document.getElementsByClassName("country-checkbox");
for (var i=0; i<checkboxes.length; i++) { checkboxes[i].checked = true; };
