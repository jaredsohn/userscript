// ==UserScript== 
// @name           Cock Blocker
// @description    A greasemonkey script to block ignored posters on the SomethingAwful forums
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript=='
var il = document.evaluate('//table[@class="post ignored"]',
document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var cocks = new Array();
var i = il.iterateNext();
while (i) { ni = il.iterateNext(); cocks.push(i); i = ni; }
for(var j = 0; j < cocks.length; j++) {
    cock = cocks[j];
    cock.parentNode.removeChild(cock);
}