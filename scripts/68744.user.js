// ==UserScript==
// @name           Get Medieval
// @namespace      http://get-medieval.livejournal.com/
// @description    Fixes broken comic images.
// @include        http://get-medieval.livejournal.com/*
// ==/UserScript==

var images = document.getElementsByTagName('img');
for (var i in images){
	var src = new String(images[i].src);
	if (src.match(/ainself.net/)){
		if (!src.match(/gif/)){
			src = src + '.gif';
			images[i].src = src;
		}
		break;
	}
}