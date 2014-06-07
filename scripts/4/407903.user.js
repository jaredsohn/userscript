// ==UserScript==
// @name        ratebeer old envelope
// @namespace   google.com
// @include     http://www.ratebeer.com/*
// @version     1
// ==/UserScript==

var arr = document.getElementsByTagName("img");
for (i = 0; i < arr.length; i++) {
	if (arr[i].src == "http://www.ratebeer.com/images/icons/mail14.png") {
		arr[i].src = "http://www.ratebeer.com/images/icons/inbox.png";
		arr[i].width = 15;
		arr[i].height = 10;
	} else if (arr[i].src == "http://www.ratebeer.com/images/icons/mail14.gif") {
		arr[i].src = "http://www.ratebeer.com/images/icons/mailhere.png";
		arr[i].width = 15;
		arr[i].height = 10;
	}
}