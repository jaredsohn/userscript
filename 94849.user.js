// ==UserScript==
// @name           GC Seek and Log
// @namespace      madd.in
// @include        http://www.geocaching.com/seek/nearest.aspx*
// ==/UserScript==

var seekTrs = document.getElementById('ctl00_ContentBody_dlResults').getElementsByTagName('tr');

for(var i = 0; i<seekTrs.length; i++){

	var tr = seekTrs[i];
	if(tr.className == "Data BorderTop"){ //this lines contain a cache

		var detailsLink = tr.getElementsByTagName('a')[0];
		var linkHref = detailsLink.href.replace("cache_details","log");	
		var logLink = document.createElement('a');
		logLink.className = "lnk";		
		logLink.style.cssFloat = "right";
		logLink.innerHTML = "<img src='/images/stockholm/16x16/add_comment.gif'>";
		logLink.href = linkHref;

		detailsLink.parentNode.insertBefore(logLink,detailsLink);
	}
	
}
