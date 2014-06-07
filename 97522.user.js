// ==UserScript==
// @name           AudioThief
// @namespace      com.steve
// @description    remove ads
// @include        http://www.audiothief.com/*
// ==/UserScript==

//jQuery('div[class^="ad_"]').remove();

var tags = document.getElementsByTagName('div');
//alert(tags.length);
var i, len = tags.length;
for (i = 0; i < len; i++) {
	var e = tags[i];
	if (e.className.indexOf('ad_') >= 0)
		{ e.innerHTML = ''; }
	else
		{ //alert(e.className + e.id); }
}