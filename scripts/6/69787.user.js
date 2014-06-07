// ==UserScript==
// @name          Post Number Unhider
// @include       http://boards.4chan.org/*
// @description   Unhides hidden post numbers on /b/
// ==/UserScript==

allQuoteLinks = document.evaluate(
	"//a[@class='quotejs']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allQuoteLinks.snapshotLength; i++) {
	thisLink = allQuoteLinks.snapshotItem(i)

	if(thisLink.href.indexOf("javascript:quote") != -1) {
		postNum = thisLink.href.substring((thisLink.href.length - 2), (thisLink.href.length - 5))
	} else {
		postNum = thisLink.href.substring((thisLink.href.length), (thisLink.href.length - 3))
	}

	postNumText = thisLink.innerHTML.replace(/XXX/g, postNum)
	thisLink.innerHTML = postNumText
}
