// ==UserScript==

// @name           NewGWJBlock

// @namespace      Nuka

// @description    Test of an updated blocking script for the new site

// @include        http://www.gamerswithjobs.com/*

// ==/UserScript==

//Any username between the /s will be blocked.  This is a comma seperated list, so you can
//add/remove any names as needed.

var nameList = new Array(/TheGameguru/);

//The replacementText string is what will replace the blocked user's original comment.
var replacementText = "<p><a><img src=http://img66.imageshack.us/img66/6135/ignoremewebxx3.jpg/></a><br>IGNORE ME!<p>";

//The replacementTag string will replace the user's tag (the little text under their name).
var replacementTag = "Grand Galactic Inquisitor";


//Begin useful script-type stuff here:
var testContents = document.evaluate("//div[@class='author-name']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < testContents.snapshotLength; i++) {
	for (var nameIndex = 0; nameIndex < nameList.length; nameIndex++)
	{	
	var blockName = nameList[nameIndex];		
	if (blockName.test(testContents.snapshotItem(i).childNodes[0].text)){
		testContents.snapshotItem(i).parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = replacementText;
		testContents.snapshotItem(i).nextSibling.nextSibling.textContent = replacementTag;
	}
	}
}
