// ==UserScript==
// @name           Outgoing Links Removal
// @namespace      http://theshadowstorm.deviantart.com/
// @description    Removes outgoing links / "there's monsters on the Internet" page from the deviantart.com domain name.
// @include        http://*.deviantart.com/*
// ==/UserScript==
var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i)
	if(links[i].href.indexOf('http://www.deviantart.com/users/outgoing?') > -1) {
		links[i].setAttribute('links[i].href.replace('http://www.deviantart.com/users/outgoing?', ''));
	}