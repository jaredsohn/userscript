// ==UserScript==
// @name	NYT Free Links
// @description	Rewrites New York Times links to point to the free archive. (Uses http://k0nrad.sobertillnoon.com/genlink/)
// @include	*
// ==/UserScript==


////To also have ad free pages, set the "NY Times: Link to Print pages:" script to
////include only "http://nytimes.blogspace.com/genlink?*" instead of "*"


(function() {
	var xpath = "//a[starts-with(@href,'http://www.nytimes.com/')]";
	var res = document.evaluate(xpath, document, null,
	                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, link;
	for (i = 0; link = res.snapshotItem(i); i++)
	{
		link.href = "http://k0nrad.sobertillnoon.com/genlink/genlink.php?q=" + link.href;
	}
	
	var xpath = "//a[starts-with(@href,'http://nytimes.com/')]";
	var res = document.evaluate(xpath, document, null,
	                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, link;
	for (i = 0; link = res.snapshotItem(i); i++)
	{
		link.href = "http://k0nrad.sobertillnoon.com/genlink/genlink.php?q=" + link.href;
	}
	
	if(window.location.href.substring(0,"http://nytimes.com/".length) == "http://nytimes.com/" || window.location.href.substring(0,"http://www.nytimes.com/".length) == "http://www.nytimes.com/"){
		var xpath = "//a[starts-with(@href,'/')]";
		var res = document.evaluate(xpath, document, null,
					    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var i, link;
		for (i = 0; link = res.snapshotItem(i); i++)
		{
			link.href = "http://k0nrad.sobertillnoon.com/genlink/genlink.php?q=" + link.href;
		}
	}
})();
