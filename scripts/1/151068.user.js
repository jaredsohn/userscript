// ==UserScript==
// @name        YouTube: Uploads Only
// @namespace   www.shlomic.com
// @description Displays only videos that has the word "uploaded" in the title. Active only on the main page and the subscriptions page.
// @include		http://www.youtube.com/
// @include     http://www.youtube.com/feed/subscriptions
// @version     1.1
// ==/UserScript==

var findAndHideNonUploads = function FindAndHideNonUploads()
{
	var snapResults = document.evaluate("//span[contains(@class,'feed-item-actions-line')]", 
	document, 
	null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
	null);
	
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) 
	{
		var item = snapResults.snapshotItem(i);
		var match = item.innerHTML.match('uploaded');
		if (match == null)
		{
			var removeItem = item.parentNode.parentNode.parentNode;
			removeItem.style.display = 'none';
		}
	}
}

function InjectFunction(func, functionName) 
{
	// Create a script node holding this func code to run when the page loads.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.appendChild(document.createTextNode(func));
	script.appendChild(document.createTextNode(functionName + '();'));

	// Insert the script node into the page, so it will run immediately
	document.body.appendChild(script);

	// Insert a call to the func everytime the feed updates (when "load more" is clicked")
	var snapResults = document.evaluate("//div[@class='feed-container']", 
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null);
		
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) 
	{
		var feedContainer = snapResults.snapshotItem(i);
		feedContainer.addEventListener('DOMNodeInserted', func, true);
	}
}

InjectFunction( findAndHideNonUploads, "FindAndHideNonUploads" );