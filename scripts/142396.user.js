// ==UserScript==
// @name        Auto-redirect to My Metafilter
// @description Redirect from less-enjoyable Metafilter pages to the tag-filtered My Mefi page.
// @namespace   http://userscripts.org/users/482793
// @version     4
// @grant	none
// @include http://www.metafilter.com/
// @include	http://www.metafilter.com/home/recentposts
// @include	http://www.metafilter.com/home/recentcomments
// @include	http://www.metafilter.com/home/popularfavorites
// @include http://metatalk.metafilter.com/*
// ==/UserScript==

try {
	page = document.getElementById("page")
	if (page) {
		var redirectMsg = document.createElement("span")
		redirectMsg.id = "redirectMsg"
		redirectMsg.style.fontSize = "x-large"
		redirectMsg.appendChild(document.createTextNode("Redirecting to My Mefi..."))
		page.parentNode.replaceChild(redirectMsg, page)
	}
	window.location.replace("http://www.metafilter.com/home/mymefi")
} catch (e) {
	alert("Auto-redirect to My Metafilter error: " + e)
}