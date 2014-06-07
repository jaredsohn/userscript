// ==UserScript==
// @name           Faceboot HttpS
// @namespace      Cecure
// @description    Modifies all http://www.facebook.com* to https://www.facebook.com
// @verson         0.9.3
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

var protokoll = document.location.protocol;
var addrs = document.location.href.split(":")[1];



if (protokoll == "http"){document.location = "https:"+addrs}

var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
	if (links[i].href.match(/.*facebook\.com.*/gi)) {
		links[i].href = links[i].href.replace(/^http:\/\//gi, "https://");
	}
}