// ==UserScript==
// @name           Break.com Fixer
// @namespace      #aVg
// @include        http://www.break.com/*
// @description    Removes video ad with alt video player.
// @version        0.1
// ==/UserScript==
var vid = document.getElementById("defaultDiv");
if(vid) {
	vid = document.evaluate("./param[@name='flashvars']", vid, null, 9, null).singleNodeValue;
	var flv = unescape(vid.value.match(/videoPath=([^&]+)/)[1]);
	vid.parentNode.data = "http://www.onlineflvplayer.com/player.swf?autostart=true&file="+flv;
}