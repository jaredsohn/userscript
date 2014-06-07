// ==UserScript==
// @name           Adobe Forums: Add "Search ID forum only" link
// @namespace      http://adobeforums.adobe.com/thread
// @description    Adds an extra link below the search box to quickly get to the advanced search for ID-only results.
// @include        http://forums.adobe.com/community/indesign/indesign_general*
// ==/UserScript==

// Author: Eric Taylor
// Last Modified: 2009-017-13
// v1.00 - Initial release

// Find the search box
if (document.getElementById) {
	if(document.getElementById('jive-userbar-search')) {
		search_obj = document.getElementById('jive-userbar-search');
		search_obj.innerHTML = search_obj.innerHTML + ' <a href="http://forums.adobe.com/search.jspa?&resultTypes=MESSAGE&communityID=3359" title="Search just the InDesign forum">Search ID forum only</a>';
	}

	if(document.getElementById('jive-userbar-right')) {
		ubright_obj = document.getElementById('jive-userbar-right');
		ubright_obj.style.padding = "5px 22px 0 0";
		ubright_obj.style.width = "300px";
	}
}