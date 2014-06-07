// ==UserScript==
// @name           Get Medieval Fixer
// @namespace      http://get-medieval.livejournal.com/
// @description    Fixes broken comic images. Based on http://userscripts.org/scripts/show/68744
// @include       http://get-medieval.livejournal.com/*
// ==/UserScript==

var images = document.getElementsByTagName('img');
for (var i in images){
	var src = new String(images[i].src);
	if (src.match(/ainself.net/)){
		if (!src.match(/gif/)){
			src = src + '.gif';
			images[i].src = src;
		}
	}
}

