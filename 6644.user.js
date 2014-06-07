// ==UserScript== 
// @name           AdBot Blocker
// @namespace      http://www.titaniummantis.com/adbotblock
// @description    A greasemonkey script to block AdBot posts on the SomethingAwful forums, thank you to the many anonymous goons who contributed their improvements.
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript=='
var il = document.evaluate('//table[@class="post" and descendant::div[@class="textads_advhere"]]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var ads = new Array();
var i = il.iterateNext();
while (i) { ni = il.iterateNext(); ads.push(i); i = ni; }
for(var j = 0; j < ads.length; j++) {
	ad = ads[j];
	ad.parentNode.removeChild(ad);
}
