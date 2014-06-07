// ==UserScript==
// @name       Remove Google Plus Button From Feedly
// @version    1.0
// @description  Removes the Google Plus +1 social button from the Full Article view in Feedly. 
//               The button causes the browser to lock up for a few seconds when you first
//               click on a folder due to the number of network calls to plusone.google.com.
//               This script simply removes the functionality.
// @include    http://www.feedly.com/*
// ==/UserScript==

function removeGooglePlusSocialButton() {
  	var elements = document.evaluate(
		"//div[contains(@class, 'gplus')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		thisElement.parentNode.removeChild(thisElement);
	}
}

document.addEventListener("DOMNodeInserted", removeGooglePlusSocialButton, true);