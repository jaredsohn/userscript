// ==UserScript==
// @name           GWJ Blocker
// @namespace      http://mywebsite.com/myscripts
// @description    Block a specific username's posts
// @include        http://www.gamerswithjobs.com/*
// ==/UserScript==

//Any username between the /s will be blocked.  This is a comma seperated list, so you can
//add/remove any names as needed.

var nameList = new Array(/JohnnyMoJo/, /TheGameguru/);

//The replacementText string is what will replace the blocked user's original comment.
var replacementText = "<p>ITTY BITTY BABY!<p>";

//The replacementTag string will replace the user's tag (the little text under their name).
var replacementTag = "I am a douchebag!";


//Begin useful script-type stuff here:
var testContents = document.evaluate("//div[@class='forum_author']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < testContents.snapshotLength; i++) {
	for (var nameIndex = 0; nameIndex < nameList.length; nameIndex++)
	{	
	var blockName = nameList[nameIndex];		
	if (blockName.test(testContents.snapshotItem(i).childNodes[0].text)){
		testContents.snapshotItem(i).nextSibling.nextSibling.innerHTML = replacementText;
		testContents.snapshotItem(i).childNodes[2].textContent = replacementTag;
	}
	}
}