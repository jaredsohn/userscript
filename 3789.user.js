// ==UserScript==
// @name          Show hidden Glob text
// @description   Shows the hidden text that Yuval Dror and Mosif also put in links' title attribute.
// @include       http://popup.co.il/*
// @include       http://www.popup.co.il/*
// ==/UserScript==



function xpath(query,node) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var allLinks, thisLink;

	allLinks = xpath("//div[starts-with(@class,'entry')]/descendant::a[@title]");
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.rel!='category tag'){
			textNode = document.createTextNode(' [' + thisLink.getAttribute('title') + ']');
			thisLink.parentNode.insertBefore(textNode, thisLink.nextSibling);
		}
	}
//}

