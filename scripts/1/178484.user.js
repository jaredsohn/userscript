// ==UserScript==
// @name        Facebook RSS Exposer
// @namespace   somini
// @include     https://www.facebook.com/*
// @version     1
// ==/UserScript==

var string_set;
var pgID;
// By Profile Pic
var A_pp = document.getElementById("profile_pic_education");
if (null != A_pp) {
	arr = /\.([0-9]*)&/.exec(A_pp.href);
	pgID = arr[1];
}


var rssLink = document.createElement("link");
rssLink.rel = "alternate";
rssLink.type = "application/rss+xml";
rssLink.title = "Facebook Wall Feed";
rssLink.href = "https://www.facebook.com/feeds/page.php?format=rss20&id="+pgID;

document.head.appendChild(rssLink);