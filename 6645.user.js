// ==UserScript==
// @name          SA Adbot Remover
// @namespace     http://adbot.forums.somethingawful.com
// @description   Remove adbots from SA Forums
// @include       http://forums.somethingawful.com/*
// ==/UserScript==
var il = document.evaluate('//table[@class="post" and descendant::dd[@class="title"]/a[contains(@href,"noads")]]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var i = il.iterateNext();
while (i) { ni = il.iterateNext(); i.parentNode.removeChild(i); i = ni; }
