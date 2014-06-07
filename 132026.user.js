// ==UserScript==
// @name           Facepunch Imgur Unblocker
// @namespace      http://facepunch.com
// @include        http://facepunch.com/*
// @include        http://www.facepunch.com/*
// @copyright      niobium93
// ==/UserScript==

var posts = document.evaluate("//*[@class='content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = posts.snapshotLength - 1; i >= 0; i--)
{
	var numberOfCensors = (posts.snapshotItem(i).innerHTML.split("*************").length - 1);
	
	for (var j = 0; j < numberOfCensors; j++) 
	{
		posts.snapshotItem(i).innerHTML = posts.snapshotItem(i).innerHTML.replace("*************", "i.imgur.com");
	};
};