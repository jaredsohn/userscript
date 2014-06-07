// ==UserScript==
// @name          Vkontakte.ru Ads Off
// @namespace     http://fonzi.posterous.com
// @description   Blocks ads on Vkontakte.ru
// @include       http://vkontakte.ru/*
// ==/UserScript==

function getElementsByClass(c) {
	var elements = new Array();
	var allTags = document.getElementsByTagName("*");
	for (i = 0, j = 0; i < allTags.length; i++) {
		if (allTags[i].className == c) {
			elements[j] = allTags[i];
			j++;
		}
	}
	return elements;
}

var ad_boxes = getElementsByClass("ad_box");
var sidebar = document.getElementById("sideBar");

if (document.getElementById("banner1")) {
	document.getElementById("banner1").style.display = "none";
}

if (document.getElementById("banner2")) {
	document.getElementById("banner2").style.display = "none";
}

for (var i in ad_boxes) {
	ad_boxes[i].style.display = "none";
}

sidebar.innerHTML = sidebar.innerHTML.replace(/<a href="http:\/\/vkontakte.ru\/help.php\?page=target">.*<\/a>/, "");