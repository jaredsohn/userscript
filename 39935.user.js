// ==UserScript==
// @name           YoutubeFmt18
// @namespace      http://d.hatena.ne.jp/Cyario/
// @description    The script makes the videos of Youtube high quality.
// @include        http://jp.youtube.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==

var url = document.location.href;
if(url.match(/.*watch.*/) && !url.match(/.*fmt=18.*/)) window.location.replace(document.URL + "&fmt=18");

var aTags = document.getElementsByTagName('a');
for (var i in aTags){
	var href = aTags[i].href;
	if(href.match(/.*watch\?v=.*/)){
		aTags[i].href = aTags[i].href + "&fmt=18";
	}
}
