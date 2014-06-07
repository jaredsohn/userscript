// ==UserScript==
// @name        Twitter Replies Search
// @namespace   http://twitter.com/scauer/replysearch
// @author      scauer on twitter and at gmail
// @description For each tweet, adds a link to search.twitter.com to find replies to that user
// @include     http://twitter.com/*
// @exclude     http://twitter.com/account/archive
// @license     Creative Commons Attribution License
// @version     0.5
// ==/UserScript==

// Version History
// v0.5
//   - Updated to new format of twitter html, still very brittle, need better method
//
// v0.4
//   - Updated to new format of twitter html, very brittle
//
// v0.3
//   - Filter out users own tweets
//
// v0.2 
//   - Changed where the user name was being retrieved so it deosn't conflict with another greasemonkey script 
//     
// v0.1 
//   - Initial Release


(function(){
	
	var tweetActions = document.evaluate(
		"//td[@class='actions']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < tweetActions.snapshotLength; i++) 
	{
		//alert(tweetActions.snapshotItem(i).firstChild.innerHTML);

		var actionDiv = tweetActions.snapshotItem(i).firstChild;

		// Crazy way to get this		
		var user = actionDiv.parentNode.previousSibling.firstChild.firstChild.firstChild.innerHTML;		
		
		if (user)		
		{
			var replyLink = document.createElement('a');
			var label = document.createTextNode('@');
			replyLink.appendChild(label);
			replyLink.setAttribute('href', 'http://search.twitter.com/search?q=%40' + user);
			replyLink.setAttribute('title', 'Search for replies to ' + user);
			replyLink.setAttribute('target' , '_blank');
			replyLink.setAttribute('style' , 'font-size:12px;');
			actionDiv.appendChild(replyLink);
		}
	}
					
})();
