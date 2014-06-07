// ==UserScript==

// @name           Faved, Schmaved
// @namespace      http://userscripts.org/users/115470
// @description    change the name of favorites

// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*

// ==/UserScript==


(function replace () 
{
	// change these variables to adjust the script output
	// var replacement = "butts lol";
	var default_replacement = "&#x272A;"; 	// star in circle
	default_replacement = "&#9733;";	// star
	var defaultCountReplacement = "&#9733;$num&#9733;";	// star

	// read settings
	var replacement = GM_getValue("FavedReplacement", default_replacement);
	var countReplacement = GM_getValue("FaveCountReplacement", defaultCountReplacement);
	
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

	// setup regexes
	var swapout = "has favorites";

	var favedRegex = new RegExp(swapout, "g");
	var favedSwapIn = replacement;

	var favoritesRegex = new RegExp("(\\d+) favorite(s)*");
	var favoritesSwapIn = countReplacement;
	favoritesSwapIn = favoritesSwapIn.replace (/\$num/g, "$1");

	// iterate over matches
	for (var node = null, i = 0; (node = nodes.snapshotItem(i)); i++) {	
		var oldMessage = node.innerHTML;
		var myMessage = oldMessage.replace(favedRegex, favedSwapIn);
		myMessage = myMessage.replace(favoritesRegex, favoritesSwapIn);
		node.innerHTML = myMessage;
	}
	
	// setup menus
	GM_registerMenuCommand( "====== Faved, Schmaved ======", function(){});
	GM_registerMenuCommand("Set replacement phrase for faved", 
		function () {			
			replacement = prompt ("What would you rather see\nin the place of \"faved\" or \"has favorites?\"\n(Currently: " + replacement + ")");
			GM_setValue("FavedReplacement", replacement);
			replace();
	})

	GM_registerMenuCommand("Set replacement phrase for favorite count", 
		function () {			
			countReplacement = prompt ("What would you rather see\nin the place of \"(count) favorites?\"\n(Use \$num for the number, might require a page reload)\n(Currently: " + countReplacement + ")\n");
			GM_setValue("FaveCountReplacement", countReplacement);
			replace();
	})

})();
