// ==UserScript==
// @name           Instant Gyazo to Imgur
// @namespace      TurtleHax
// @description    Instantly re-hosts Gyazo images to your Imgur account after uploading.
// @include        http://gyazo.com/*
// @match          http://gyazo.com/*
// @run-at         document-start
// ==/UserScript==

if ( document.referrer === '' && history.length === 1 ) {
	document.location = 'http://imgur.com/api/upload/?url='+encodeURIComponent(document.location.href+'.png');
}