// ==UserScript==
// @name         UserFriendly.org - Large Comic Image
// @version      0.3
// @date         2006-01-30
// @description  Changes the front page image to the full size image
// @author       Paul Dawson
// @include      http://*userfriendly.org/
// @include      http://*userfriendly.org/static/
// @include      http://*userfriendly.org/cartoons/archives/
// ==/UserScript==

window.addEventListener("load", function (){
	var images = window.document.getElementsByTagName("img");
	for (var i=0;i<images.length;i++) {
		if (images[i].src.match(/.*\/cartoons\/.*\/xuf.*/)) {
			images[i].setAttribute("src",images[i].src.replace(/\/xuf/,"/uf"));
			images[i].style.width="auto";
			images[i].style.height="auto";
    }
  }
}, false);

