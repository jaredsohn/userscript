// ==UserScript==
// @name          Flickr Interestingness Timeline
// @description	  Adds a link to the Flickr Interestingness Timeline Service at http://labs.qtvarde.ca  [Adapted from:  http://userscripts.org/scripts/show/56364 by: Mark Whitaker http://bitrot.net/]
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// ==/UserScript==

(function() {

	var m = window.location.href.match(/^https?:\/\/[^/]*\bflickr\.com\/photos\/[^/]+\/(\d+)/i);
	if (m.length && m[1])
	{
		var fITLink = document.createElement("li");
		fITLink.setAttribute("class","Stats");
		fITLink.innerHTML = '<a class="Plain" href="http://labs.qtvarde.ca">Flickr Interestingness Timeline</a>';
		add = document.evaluate("//li[contains(@class,'Stats')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).parentNode;
		add.appendChild(fITLink);
	}		
})();