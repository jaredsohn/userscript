// ==UserScript==
// @name           MacHeist forumfix
// @namespace      http://7676.se
// @description    Moves the pages over the reply box
// @include        http://www.macheist.com/forums/viewtopic.php*
// ==/UserScript==

var linkpb, thisDiv, quickreply,newElement;
var nextLink,nextLink_b, nextLink_t;
var linkpt;

	linkpb = document.evaluate(
		"//div[@class='linkpb']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	linkpt = document.evaluate(
		"//div[@class='linkpt']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	quickreply = document.evaluate(
		"//div[contains(@class,'quickreply')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		newElement = document.createElement('hr');
quickreply.snapshotItem(0).parentNode.insertBefore(newElement,quickreply.snapshotItem(0));	 
quickreply.snapshotItem(0).parentNode.insertBefore(linkpb.snapshotItem(0),quickreply.snapshotItem(0));


lastLink = document.evaluate(
	"//div[@class='linkpb']/div/a[last()]|//div[@class='linkpt']/div/a[last()]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
		
	nextLink = document.evaluate(
		"//div[@class='linkpb']/div/strong|//div[@class='linkpt']/div/strong",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
		);
		var nsibling = nextLink.snapshotItem(0).nextSibling;
		while(nsibling.nodeType == 3){
			nsibling= nsibling.nextSibling;
		}
		nextLink_b = nsibling.cloneNode(true);
		nextLink_b.id = 'nextLink_b';
		nextLink_b.innerHTML = " - Next page";
		nextLink_t = nsibling.cloneNode(true);
		nextLink_t.id = 'nextLink_t';
		nextLink_t.innerHTML = " - Next page";

	if(null === lastLink.snapshotItem(0).nextSibling){

		lastLink.snapshotItem(0).parentNode.insertBefore(nextLink_t,lastLink.snapshotItem(0).nextSibling);
		lastLink.snapshotItem(1).parentNode.insertBefore(nextLink_b,lastLink.snapshotItem(1).nextSibling);
	}

