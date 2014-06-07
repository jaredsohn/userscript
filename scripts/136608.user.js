// ==UserScript==
// @name           Squish Small Posts
// @namespace      http://forums.tigsource.com
// @description    Makes small posts smaller by removing the avatar and signature
// @include        http://forums.tigsource.com/*
// ==/UserScript==

var POST_LENGTH = 150;

var snapPostElements = document.evaluate("//div[@class='post']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < snapPostElements.snapshotLength; i++) {
	var currentElement = snapPostElements.snapshotItem(i);
	
	if (currentElement.innerHTML.length < POST_LENGTH) {
		currentElement = currentElement.parentNode.parentNode.childNodes[1].childNodes[3];
		
		//Remove all level images
		var imgElementI = document.evaluate("img", currentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var imgElement = imgElementI.iterateNext();
		var removeList = new Array();
		var num = 0;
		while (imgElement) {
			removeList[num] = imgElement;
			num++;
			imgElement = imgElementI.iterateNext();
		}
		for (var j = 0; j < num; j++) {
			currentElement.removeChild(removeList[j]);
		}
		
		//Remove avatar and phrase
		var avatarDiv = document.evaluate("div", currentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (avatarDiv.snapshotLength > 0) {
			currentElement.removeChild(avatarDiv.snapshotItem(0));
		}
		
		//Remove all br
		var snapBr = document.evaluate("br", currentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < snapBr.snapshotLength-2; j++) {
			currentElement.removeChild(snapBr.snapshotItem(j));
		}
		
		//Remove text nodes not displaying level
		var patt = new RegExp("Level [0-9]{1,2}");
		
		var snapText = document.evaluate("text()", currentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for (var j = 0; j < snapText.snapshotLength; j++) {
			textNode = snapText.snapshotItem(j);
			if (!patt.test(textNode.data)) {
				textNode.data = "\n";
			}
		}
		
		currentElement = currentElement.parentNode.parentNode.parentNode.childNodes[2].childNodes[1];
		if (currentElement.childNodes.length > 3) {
			currentElement.removeChild(currentElement.childNodes[3]);
			currentElement.removeChild(currentElement.childNodes[4]);
		}
	}
}