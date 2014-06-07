// ==UserScript==
// @name           SA Adbot Remover
// @namespace      forums.somethingawful.com
// @description    remove adbot posts
// ==/UserScript==

var il = document.evaluate('//tr[@class="adbot"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var i = il.iterateNext();
while (i) { ni = il.iterateNext(); i.parentNode.removeChild(i); i = ni; }