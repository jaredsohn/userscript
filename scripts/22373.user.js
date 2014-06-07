// ==UserScript==
// @name           Sewerbot
// @namespace      hunsley@gmail.com
// @description    Visits the sewer until you are out of chewing gum, or adventures.
// @include        *kingdomofloathing.com/charpane.php*
// ==/UserScript==

// Sewerbot - Spend an adventure in the sewer, and it will keep adventuring there until you're out of gum or adventures
// 			Not compact mode compatible because I didn't spend the effort.

advImgNode = document.evaluate('//img[contains(@src,"itemimages/hourglass.gif")]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
advs = parseInt(advImgNode.nextSibling.nextSibling.textContent);
prevAdvs = GM_getValue("advs",advs);
GM_setValue("advs",advs);

if(prevAdvs == advs) {
	return false;
}

//find last adventure link
var node,s;
var textNodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0;i<textNodes.snapshotLength;i++) {
	node = textNodes.snapshotItem(i);
	s=node.data;
	if(s.match("^Last Adventure:$")) {
		charPaneLink = node.parentNode.parentNode.parentNode.nextSibling.nextSibling.getElementsByTagName("a")[0].href;
	}
}	

if (charPaneLink.match("sewer.php")) {
	top.frames[2].location.pathname = "sewer.php";
}
else {
	return false;
}