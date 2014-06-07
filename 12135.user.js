// ==UserScript==
// @name           LastNightsParty Image Redirect
// @namespace      www.highlanders.co.za
// @description    Alters the links to full size images directly to images
// @include        http://www.lastnightsparty.com/*
// ==/UserScript==

(function () {

	var allLinks, thisLink;
	allLinks = document.evaluate(
	    '//a[starts-with(@href, "slides/")][count(img)>0]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
		    
	    var ext = "jpg";
	    
	    thisLink = allLinks.snapshotItem(i);
	    
	    if (thisLink.firstChild.tagName.toLowerCase() == "img")
	    {
	    	ext = thisLink.firstChild.src.substr(-3, 3);
	    }
	    
	    thisLink.href = thisLink.href.replace(".html", "." + ext);
	    
	}
	    
})();	    