// ==UserScript==
// @name           changeMailIcon
// @namespace      *.reddit.com
// @description    Changes reddit's orangered envelope image to one more accessible per http://www.reddit.com/r/reddit.com/comments/cot0n/reddit_im_colorblind_and_this_would_make_my_life/.
// @include        http://*.reddit.com/*
//Version 2 - apparently Reddit now uses a single sprite and a CSS background property for this
// ==/UserScript==


var iconUrl = "http://imgur.com/Wa29V.png"; //Quick icon, replace with your own if you like

function changeImage(newIcon) {
	var head = document.getElementsByTagName('head')[0];
	var css = document.createElement('style');
	css.type = "text/css";
	css.innerHTML = 'a#mail.havemail { background-image: url("' + newIcon + '"); background-position: 0 0; }';
	head.appendChild(css);
}
changeImage(iconUrl);