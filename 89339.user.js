// ==UserScript==
// @name	Quick Redirect
// @namespace	Quick Redirect
// @description	This script completely removes the delay that sometimes exists when a website redirects the browser to another page or site using the html tag, meta http-equiv="refresh".
// By default the script will only quick-redirect from qurl.com to imdb.com. Other sites can be configured by right-clicking on the Greasemonkey icon / Manage User Scripts / Select Quick Redirect from list / Edit, and adding further entries to the @include comment block. To be security-conscious, you should only configure destination sites (in this case, imdb) that you fully trust. Be aware that where an origin website (A) uses qurl.net (B) to forward users to imdb.com (C), the referer passed from the user's browser to site C is site B (NOT site A). Although counter-intuitive, clicking the browser BACK button at site C returns the browser straight to site A (NOT site B).
// @include        http://qurl.net/redir/?http://www.imdb.com/*
// ==/UserScript==

quickRedirect();

function quickRedirect(){
	var metas=document.getElementsByTagName("meta");
	for (var i=0,ilen=metas.length;i<ilen;i++){
		var thisMeta=metas[i];
		var thisText=thisMeta.getAttribute("http-equiv");
		if (thisText!=null && thisText.toLowerCase()=="refresh")
		{
			var thisContentArray=thisMeta.getAttribute("content").split("URL=");
			GM_log("Instantaneous redirect to "+thisContentArray[1]);
			document.location.replace(thisContentArray[1]);
			break;
		}
	}
}