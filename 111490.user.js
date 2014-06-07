// Ignore Reddit Birthday Posts
// Author: Ictinus
// Released 27 August 2011.

// ==UserScript==
// @name		Ignore Reddit Birthday Posts
// @version 		1.00
// @namespace		http://ictinus.com/irbp/
// @description		Reddit user Forbizzle requested the ability to ignore birthday posts.
// @include			http://www.reddit.com/*
// @exclude			http://www.redditmedia.com/*
// @exclude         http://www.reddit.com/comscore-iframe/*
// @exclude         http://static.reddit.com/*
// ==/UserScript==

var ignoreRedditBirthdayPosts = {

	version : 1.00,
	init: function () {
		var allDivs, thisDiv;
		//identify the type of page: reddit; user;
		
		allDivs = document.evaluate(
			"//div[contains(@class,'entry')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		var strSearch = new RegExp("just celebrated a reddit birthday","i");
		
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			var nodeParent = thisDiv.parentNode;
			var nodeTop = nodeParent.parentNode;
						
			if (thisDiv.innerHTML.search(strSearch) != -1) {
				nodeTop.removeChild(nodeParent);
			}
		}
	}
}

if (document.body) { 
	ignoreRedditBirthdayPosts.init();
}
