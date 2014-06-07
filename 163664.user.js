// ==UserScript==
// @name           4chan - gifs
// @namespace      http://*4chan.org
// @include        http://boards.4chan.org/*
// ==/UserScript==

var thumbs = document.getElementsByTagName("img");
var num = thumbs.length; 

for(i = 0; i < num; i++){
	if(thumbs[i].className == "thumb"){
		if(thumbs[i].src.match(".gif")){
			thumbs[i].src = thumbs[i].src.replace("s", "");
			thumbs[i].src = thumbs[i].src.replace("0.thumbs", "images");
			thumbs[i].src = thumbs[i].src.replace("thumb", "src");
		}
	}
}

