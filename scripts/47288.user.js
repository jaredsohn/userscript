// ==UserScript==
// @name           LA - Hotlinks
// @namespace      Legendarena
// @description    New links on the left side.
// @include        *legendarena.com*
// ==/UserScript==


var allLinks, thisLink, element,xmlhttp,a ,b, form, newform;

allLinks = document.evaluate(
    '//a[@href="marketplace.php"]',
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	target=allLinks.snapshotItem(0);
	
	newElement = document.createElement('a');
	newElement.href = 'auction_house.php?action=list_auctions';
	newElement.className="side";
	newElement.innerHTML="GC Market";
	newElement.title="http://legendarena.com/auction_house.php?action=list_auctions";
	
	//alert(allLinks.snapshotItem(0).className);
	
    target.parentNode.insertBefore(newElement, target.nextSibling);
	target.parentNode.insertBefore(document.createElement('br'), target.nextSibling);
