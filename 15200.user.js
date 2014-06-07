// ==UserScript==
// @name          IFrame Alternate Source Indicator
// @namespace     http://agarren.myopenid.com
// @description   hightlight iframes that pull from a different source
// @include       http://*
// @include       https://*
// ==/UserScript==

var thisdomain = window.location.host;
iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++) {
	var matches = iframes[i].src.match(/https?:\/\/(.*\.\w{2,3})\//);
	if (matches.length >= 1 && matches[1] != thisdomain ) {
		iframes[i].style.border = "3px dashed red";
	}
}