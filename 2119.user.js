// ==UserScript==
// @name           Helgon.net remove horizontal scrollbar
// @namespace      http://henrik.nyh.se
// @description    Removes horizontal scrollbar (in Fx 1.5) from Helgon.net main frame.
// @include        http://*helgon.net/main.asp*
// ==/UserScript==

var iframe = document.evaluate("//IFRAME[@name='helgonmain']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

// Horizontal (left - right) scrollbar
iframe.style.overflowX = 'auto';

// Vertical (up - down) scrollbar
iframe.style.overflowY = 'scroll'; 

// 'auto'   = only display when needed;
// 'scroll' = always display

