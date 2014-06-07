// ==UserScript==
// @name           ModTheater.com code box tweak
// @namespace      http://www.modtheater.com/forum/member.php?u=5281
// @description    Tweaks the TMT vBulletin forum code-box to use nicer mono space fonts, and use all the page width available.
// @include        http://www.modtheater.com/forum/*
// ==/UserScript==
	
	//Set a couple of vars
	var allpretags;
	var thispretag;
	
	//Search the page for pre tags w/ a class attribute
	allpretags = document.evaluate("//pre[@class='alt2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	{
		//loop through any found instances
		for (var i = 0; i < allpretags.snapshotLength; i++) 
		{
			thispretag = allpretags.snapshotItem(i);
			thispretag.id='codebox';
		}
	}
	
	//Define some css to use for the codebox. :)
	var css = "@namespace url(http://www.w3.org/1999/xhtml); #codebox{font-family: Andale Mono,lucida console,monospace;width: auto !important;}";
	//varous ways of inserting the css (from userstyles.org)
	if (typeof GM_addStyle != "undefined") 
	{
		GM_addStyle(css);
	} 
	else if (typeof addStyle != "undefined") 
	{
		addStyle(css);
	}
	else 
	{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0)
		{
			var node = document.createElement("style");
			node.type = "text/css";
			node.innerHTML = css;
			heads[0].appendChild(node); 
		}
	}