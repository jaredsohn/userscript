// ==UserScript==
// @name        ShowImages
// @namespace   com.ta
// @include     http://www.trueachievements.com/forum/*
// @version     1
// ==/UserScript==

var urls = document.getElementsByTagName("a");
var url;
var regex = new RegExp("(.gif|.jpg|.png|.jpeg)");

for(var i = 0; i < urls.length; i++) {
	if(urls[i].hasAttribute("rel") && (urls[i].rel == "external nofollow")) {
		url = urls[i].href;
		if(regex.test(url)) { 
			urls[i].innerHTML = "<img src=\"" + url + "\" />";
		}
	}
}