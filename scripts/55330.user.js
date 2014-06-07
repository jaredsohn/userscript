// ==UserScript==
// @name           RSC Sigfault
// @namespace      http://userscripts.org/users/83011
// @include        http://www.zybez.net/community/*
// ==/UserScript==

window.addEventListener('load', function(e) {
	var sigs = document.getElementsByClassName("signature");
	for(var i=0;i<sigs.length; i++) {
		imgs = sigs[i].getElementsByTagName('img');
		for(var j=0;j<imgs.length;j++) {
			img = imgs[j];
			if(img.width > 500 || img.height > 150) {
				img.style.border = "5px red solid";
			}
		}
	}
}, false);
