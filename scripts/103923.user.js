// ==UserScript==
// @name           playlist_once
// @namespace     http://userscripts.org/scripts/show/103923
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://youtube.com/*
// @include       https://*.youtube.com/*
// @version       1 june 2011
// ==/UserScript==
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
//var url  = document.location.href;

var bar = document.getElementById("playlist-bar-tray-content");
var lis = bar.childNodes[0].getElementsByTagName("li"); //.childNodes();
var lastItem = lis[lis.length-1];
var myclass = lastItem.getAttribute('class');
if (myclass.contains("playlist-bar-item-playing")){
	//"playlist-bar-autoplay-button"
	document.getElementById('playlist-bar-autoplay-button').click();
	//alert(1);
}else{
	//alert(2);
}

//alert(lastItem.innerHTML);