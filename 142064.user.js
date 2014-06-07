// Version 1.0
// 22/08/2012
// Copyright (c) 2012, Fergo
// http://www.fergonez.net
//
// ==UserScript==
// @name          Imgur Downloader
// @namespace     http://fergonez.net/imgur_download.user.js
// @description   Get direct links (full resolution) list from Imgur albums (Blog View only) 
// @include       http://imgur.com/*
// ==/UserScript==


var imgs = document.getElementsByTagName("a");
var result = "";
var count = 0;
var footer = document.getElementById("footer-links");

for (i = 0; i < imgs.length; i++) {
	if (imgs[i].innerHTML == "View full resolution") {
		result = result + imgs[i].href + '<br/>';
		count++;
	}
}

function popuplink() {
    footer.innerHTML = footer.innerHTML + "<br/>" + result;
}

footer.innerHTML = footer.innerHTML + '<a id="poplinks" href="javascript:window.scrollTo(0, document.body.scrollHeight);" class="title" title="show direct links">direct links</a>'
var button = document.getElementById('poplinks');
button.addEventListener('click',popuplink,true)