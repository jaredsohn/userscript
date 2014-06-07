// ==UserScript==
// @name           KeepVidDirect
// @namespace      KeepVidDirect
// @description    Direct Download KeepVid video
// @include        http://keepvid.com/*
// ==/UserScript==


var allLinks = document.getElementsByTagName('a');
var links = new Array();
for (i = 0; i < allLinks.length; i++) {
   if ((allLinks[i].href) && (allLinks[i].href.indexOf('/save-video.mp4') > -1)) {
		allLinks[i].href = unescape(allLinks[i].href.replace(/.*\/save-video.mp4\?/,''));
   }
}