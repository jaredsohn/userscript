// ==UserScript==
// @name           Lupa.cz - placena inzerce
// @namespace      366.hopto.org
// @description    Zpruhledneni clanku placene inzerce.
// @include        http://www.lupa.cz/
// ==/UserScript==

var result = document.evaluate("//h4[@class='admarker']/..", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(i=0;i<result.snapshotLength;i++){
  var h=result.snapshotItem(i);
	h.style.opacity="0.2";
}
