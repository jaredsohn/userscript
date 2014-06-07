// ==UserScript==
// @name        FBInterpolator
// @namespace   C:/plik.css
// @include     https://www.facebook.com/*
// @version     0.01.6
// @grant       none
// ==/UserScript==
window.onload = function() {
	var profile_pic = document.getElementsByClassName("profilePic img");
	if(profile_pic.length != 0 && profile_pic[0].parentElement.tagName != "A") {
		var anchor = document.createElement("a");
		anchor.href = profile_pic[0].src.replace(/\/c.+?\/[\w]160x160/,"");
		profile_pic[0].parentElement.appendChild(anchor);
		anchor.appendChild(profile_pic[0]);
	}
}