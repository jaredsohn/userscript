// ==UserScript==
// @name           Facebook Suggest Post remover
// @namespace      http://userscripts.org/users/bedurndurn
// @description    Tell Mark to go Zuck himself by removing the Suggest Post crap that adblock for chrome doesn't remove
// @include        http*://www.facebook.com/*
// ==/UserScript==


var res = document.evaluate("//span[contains(text(),'Suggested Post')]", document, null, 7, null);

if (res.snapshotLength > 0) {

	for (i=0; i < res.snapshotLength; i++) {
		if (res.snapshotItem(i).className == "fwn fcg") {
			current = res.snapshotItem(i);
			while (current.tagName != "BODY") {
				current = current.parentNode;
				if (current.tagName == "LI") {
					current.parentNode.removeChild(current);
					break;
				}
			}
		}
	}
}