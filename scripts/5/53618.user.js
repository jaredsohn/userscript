// ==UserScript==
// @name           National Geographic Opener. 
// @namespace      http://www.hide10.com/
// @description    National Geographic Opener. 
// @version        0.0.1
// @include        http://www.nationalgeographic.co.jp/news/*
// ==/UserScript==
// Referred        http://userscripts.org/scripts/show/48209
if(document.URL.search("&expand") == -1)
{
	window.location.search += "&expand";
}