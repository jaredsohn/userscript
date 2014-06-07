// ==UserScript==
// @name          PicasaBoxy
// @description	  Auto Load Original size
// @auther        http://toolboxy.blogspot.com/
// @include       *.googleusercontent.com/*
// @version       0.5
// ==/UserScript==

(function(){
	var picasaRegex = new RegExp(/^http(?:s)?:\/\/lh[0-9]?\.googleusercontent\.com\/[-_0-9a-zA-Z]{12}\/[-_0-9a-zA-Z]{11}\/[-_0-9a-zA-Z]{11}\/[-_0-9a-zA-Z]{11}\/([-_0-9a-zA-Z]{1,})\/.+$/);
	var url = window.location.href;
	if(url.match(picasaRegex)[1]!="s0") {
		document.location = url.replace(url.match(picasaRegex)[1], "s0");
	}
})()