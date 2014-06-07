// ==UserScript==
// @name        Youtube Channel RSS Exposer
// @namespace   somini
// @description Expose the RSS feed for Youtube channels
// @include     https://www.youtube.com/channel/*
// @include     http://www.youtube.com/channel/*
// @downloadURL http://userscripts.org/scripts/source/184485.user.js
// @updateURL http://userscripts.org/scripts/source/184485.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==

var string_set;
var channelName;
// By Profile Pic
var metas = document.head.getElementsByTagName("meta");
for (var i=0;i<metas.length;i++) {
	if (metas[i].getAttribute("itemprop") == "channelId") {
		channelName = metas[i].getAttribute("content");
		break;
	}
}

var rssLink = document.createElement("link");
rssLink.rel = "alternate";
rssLink.type = "application/rss+xml";
rssLink.title = "Youtube Channel Feed";
rssLink.href = "https://gdata.youtube.com/feeds/base/users/"+channelName+"/uploads?alt=rss&orderby=published";

document.head.appendChild(rssLink);