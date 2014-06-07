// ==UserScript==
// @name        HidePics for Twitter
// @namespace   sandros.hu
// @description No more picture previews on Twitter.
// @include     https://*twitter.com/*
// @version     1
// @grant       none
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".twitter-timeline-link.media-thumbnail.is-preview { display: none }";
	body.appendChild(div);


}