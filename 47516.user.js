// ==UserScript==
// @name           LA - Spam Targets
// @namespace      Legendarena
// @description    Spam targets linked on left.
// @include        http://legendarena.com/battle.php
// ==/UserScript==


var allLinks, thisLink, element,xmlhttp,a ,b, form, newform;

allLinks = document.evaluate(
    '//a[@href="advancedsearch.php"]',
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	target=allLinks.snapshotItem(0);
	

	newElement = document.createElement('a');
	newElement.href = 'profile.php?who=Vamp';
	newElement.className="side";
	newElement.innerHTML="Spam Target Vamp";
	newElement.title="http://legendarena.com/profile.php?who=Vamp";
	
	//alert(allLinks.snapshotItem(0).className);
	
    target.parentNode.insertBefore(newElement, target.nextSibling);
	target.parentNode.insertBefore(document.createElement('br'), target.nextSibling);

		newElement = document.createElement('a');
	newElement.href = 'profile.php?who=Rare';
	newElement.className="side";
	newElement.innerHTML="Spam Target Rare";
	newElement.title="profile.php?who=Rare";
	
	//alert(allLinks.snapshotItem(0).className);
	
    target.parentNode.insertBefore(newElement, target.nextSibling);
	target.parentNode.insertBefore(document.createElement('br'), target.nextSibling);
