// ==UserScript==
// @name                Douban Photo Auto Next Photo
// @namespace	        dongqs.douban
// @description	        douban photo auto click next after click next once
// @include		http://www.douban.com/photos/photo/*
// ==/UserScript==

function redirect() {
	window.location = document.getElementById("next_photo").href;
}
if (window.location.href.match(/^http:\/\/www.douban.com\/photos\/photo\/.*\/#image$/)) {
	console.log("wait 10 sec then redirect to next photo");
	setTimeout(redirect, 10000);
}
