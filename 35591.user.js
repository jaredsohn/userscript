// ==UserScript==

// @name           FavoriteThis

// @namespace      metafilter

// @description    change the name of favorites

// @include        http://metafilter.com/*

// @include        http://*.metafilter.com/*

// ==/UserScript==

(function () 
{
	// change these variables to adjust the script output
	var replacementWordLowerCase = "schmavorite";
	var replacementWordUpperCase = "Schmavorite";
	
	
	var searchPattern;
	
	
	if (location.href.match("metafilter.com/user") ) 
	{
		searchPattern = "//div[@class='usertext']";
	}
	else
	{
		searchPattern = "//span/a";
	}	
	var nodes = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (var node = null, i = 0; (node = nodes.snapshotItem(i)); i++) {	
		var oldMessage = node.innerHTML;
		var myMessage = oldMessage.replace(/favorite/g, replacementWordLowerCase);
		myMessage = myMessage.replace(/Favorite/g, replacementWordUpperCase);
		node.innerHTML = myMessage;
	}	
})();