// ==UserScript==
// @name        MC forum total Blocker
// @namespace   Ian.M
// @description Hides blocked posters in forum topic lists and specific spammers
// @include     http://www.microchip.com/forums/*
// @version     2.0
// ==/UserScript==


function  hideSpamByXPath(partXPath) {
	var snapResults=document.evaluate( "//table[@class='maintable']/" + partXPath + "/ancestor::tr[@class]",
					   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
		// do stuff with elm
		elm.style.display = "none"; //Hide the spam
	}
}

// Kill topics with last reply from a member in your blocklist.

hideSpamByXPath("tbody/tr/td[5]/descendant::a[@class='ignored']");

// Kill topics with individual spam phrases in first post body (hover text only)

hideSpamByXPath("descendant::a[contains(@title,'.solidwoodkitchen.')]");

// Add more lines changing the text in '' (not "" - that's the partial XPath) to match other spam contents.

