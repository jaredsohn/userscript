// ==UserScript==
// @name        Boards.ie - Notification in Title
// @namespace   http://userscripts.org/users/436255
// @description Display notification count in page/tab title
// @version        1.1
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/*
// @include        https://www.boards.ie/*
// ==/UserScript==

//v1.1 - don't add zero

if(document.getElementById("badge_notices") != null)
{
	var title = document.title;
	if(document.getElementById("badge_notices").innerHTML != "0")
		document.title = document.getElementById("badge_notices").innerHTML + ": " + title;
	document.getElementById("badge_notices").addEventListener("DOMSubtreeModified", function(){
		if(document.getElementById("badge_notices").innerHTML != "0")
			document.title = document.getElementById("badge_notices").innerHTML + ": " + title;
		else
			document.title = title;
	});
}