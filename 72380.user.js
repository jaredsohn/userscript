// elcarteltv.org Jw Player fullscreen video user script
// version 0.1
// Author: Greg Bray (3/24/2010)
// Website: http://blog.theg2.net/
// License: free for personal or commercial use under the Creative Commons Attribution 3.0 United States License.

// ==UserScript==
// @name          elcarteltv.org Jw Player fullscreen video
// @namespace     http://codeblog.theg2.net/2010/03/ted-fullscreen-video-multiple-monitor.html
// @description   Resizes the video player to the full width and height of the screen so you can watch it on a multi-monitor system
// @include http://www.elcarteltv.org/*
// ==/UserScript==

//alert('start');
var h = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
var w = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
//Check for embeded video
var Embeds = document.getElementsByTagName("embed");
var eVideo;
for(var i in Embeds){if(Embeds[i].src == "http://www.elcarteltv.org/player.swf"){eVideo=Embeds[i].parentNode.removeChild(Embeds[i]);}}
if(eVideo){
	if(window.parent){//Video is in child iframe. NOTE: bug in Google Chrome... this wont work :-( http://code.google.com/p/chromium/issues/detail?id=20773
		var h = window.parent.innerHeight || window.parent.document.documentElement.clientHeight || window.parent.document.getElementsByTagName('body')[0].clientHeight;
		var w = window.parent.innerWidth || window.parent.document.documentElement.clientWidth || window.parent.document.getElementsByTagName('body')[0].clientWidth;
		eVideo.height = h-20;
		eVideo.width = w-35;
		window.parent.document.body.appendChild(eVideo);
		window.parent.scrollTo(0,10000000);
	} else {//Video is in current
		eVideo.height = h-20;
		eVideo.width = w-35;
		document.body.appendChild(eVideo);
		window.scrollTo(0,10000000);
	}
}