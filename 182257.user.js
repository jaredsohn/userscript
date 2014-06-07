// ==UserScript==
// @name           N24.de TV-bar auto-hide
// @namespace      http://www.martinmunich.com
// @include        *N24.de*
// @description    Automatically hide TV-bar
// @downloadURL    https://userscripts.org/scripts/source/182257.user.js 
// @updateURL      https://userscripts.org/scripts/source/182257.user.js
// @version        1.2
// ==/UserScript==

window.addEventListener('load', function() { 
   document.evaluate("//div[@class='e_007']//a[@class='arrow']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); 
}, false);
