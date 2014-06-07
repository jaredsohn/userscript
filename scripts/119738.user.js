// ==UserScript==
// @name           YouTube Sidebar Remover & Subscription Enlarger v3
// @namespace      SqTH
// @description    Removes Video-Sidebar from Youtube homepage,maximise the with of your subscriptions for old good display and automaticly display everything in feed.
// @include        http://*.youtube.com/
// @include        http://*.youtube.com/index
// @include        https://*.youtube.com/
// @include        https://*.youtube.com/index
// ==/UserScript==

document.getElementById("video-sidebar").style.display = "none";
document.getElementById("feed").style.width = "770px";
document.getElementById("feed-background").style.width = "770px";

//auto-display everything
//By Cody Bellinger
if (window.frameElement) return;
(function() {
	var cookie = "feed_view=e";
	if(document.cookie.search(cookie) == -1) {
		document.cookie = cookie;
		location.reload();
	}
})()