// ==UserScript==
// @name           Screened.com Ignore List
// @namespace      http://userscripts.org/users/bedurndurn
// @description    Some people just aren't worth reading. With this script, you can specify usernames and have their posts on Screened.com vanish from your view.
// @include        http*://www.screened.com/*
// ==/UserScript==

//Here's the ignore list:

var ignoreList = 	[
						"/profile/palooka/" //Add extra profile links here, comma separated
					];

//screened.com uses Ajax to load in the comments, so we'll need a mutation listener
document.addEventListener('DOMNodeInserted', ProcessIgnoreList);
					
function ProcessIgnoreList(e) {
					
	for (i = 0; i < ignoreList.length; i++) {
		//this selects the comment blocks from your selected idjit
		var results = document.evaluate('//a[@href="' + ignoreList[i] + '"]/parent::div[@class="user"]/../..', document, null, 7, null);
		
		//now we'll iterate through them and set their hidden flag to true;
		for (j=0; j < results.snapshotLength; j++) {
		  results.snapshotItem(j).hidden = true;
		}
	}
}
