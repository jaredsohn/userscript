// ==UserScript==
// @name          A9 Ad remove
// @namespace     http://www.litzke.com
// @description   Remove advertisements from a9 search
// @include       http://*a9.*
// ==/UserScript==

//remove the right-hand bar
var slclass=document.evaluate('//*[@class="sl-table"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0;i<slclass.snapshotLength;i++)
{
	var sl2=slclass.snapshotItem(i);
	sl2=sl2.parentNode.parentNode.parentNode.removeChild(sl2.parentNode.parentNode);
}