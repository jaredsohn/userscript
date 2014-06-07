// ==UserScript==
// @name           GBATemp Image Fix
// @description    Fixes old images on GBATemp
// @include        http://gbatemp.net/*
// @include		   http://www.gbatemp.net/*
// ==/UserScript==

var allImages = document.getElementsByTagName("img");
for(var v=0;v<allImages.length;v++){
	var src = allImages[v].getAttribute("src");
	if(src.match(/http:\/\/gbatemp\.net\/public\/style_emoticons/)){
	break;
	}
	if(src.match(/style_emoticons/)){
		allImages[v].setAttribute("src",src.replace(/style_emoticons/,"http://gbatemp.net/public/style_emoticons"));
	}
}