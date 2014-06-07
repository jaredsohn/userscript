// ==UserScript==
// @name			Mobygames Better Screenshots Navigation
// @include			http://www.mobygames.com/game/*/*/screenshots/gameShotId,*/*
// @version			0.1
// @namespace		http://userscripts.org/users/mtulio
// @updateURL		http://userscripts.org/scripts/source/149951.meta.js
// @downloadURL		http://userscripts.org/scripts/source/149951.user.js
// ==/UserScript==

// Next and previous
nextNode = xpath("//a[contains(text(), 'Next')]");
previousNode = xpath("//a[contains(text(), 'Previous')]");

window.addEventListener('keydown', handleKeys, false);

function handleKeys(event) {
	switch (event.which) {
		// Left arrow
		case 37:
			if (previousNode != null)
				window.location = previousNode.href;
			break;
		// Right arrow
		case 39:		
			if (nextNode != null)
				window.location = nextNode.href;
			break;
	}
}

// Focus on the image
image = xpath("//img[contains(@src,'/images/shots/')]");
imageP = image.parentNode.parentNode // Actually, focus on it's parent paragraph
pId = "_p"
imageP.id = pId

document.location.hash = "#" + pId

function xpath(xpathExpression, resultType) {
	return document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
