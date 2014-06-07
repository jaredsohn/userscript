// ==UserScript==
// @name           FBHiddenLikes
// @namespace      FBLike
// @include        http://www.facebook.com/*pages/*
// ==/UserScript==

//GM_log("hidden like");
//var s = document.getElementById("tab_canvas"); //.getElementsByTagName("span"); 
var t = document.getElementsByTagName("span");
for (i=0; i<t.length; i++) 
{ 
//	GM_log(i);
	if (t[i].style) 
	{ 
		if (t[i].style.visibility) t[i].style.visibility = ""; 
	}
}
//location.reload(true);