// ==UserScript==
// @name           BigFriendPic
// @namespace      facemonkey.friends
// @include        http://www.facebook.com/*
// ==/UserScript==

var bigFriendPic = function () {
	if (location.href.search (/www\.facebook\.com\/.*friends/) > -1) {
		var images = document.getElementsByTagName("IMG");
		var friendPicFound = false;
		for (var i=0; i<images.length; i++) {
			var image = images[i];
			if (image.className == "sm" && image.style.display != "inline") {
				image.style.display = "inline";
				friendPicFound = true;
			}
			else if (image.className == "sq" && image.style.display != "none") {
				image.style.display = "none";
			}
		}
	}
}
window.setInterval ("var f = " + bigFriendPic + "; f ();", 1000);
