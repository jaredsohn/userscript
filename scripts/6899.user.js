// ==UserScript==
// @name           Yahoo Groups Head Banner Killer
// @namespace      http://www.webbird.de
// @description    Removes the ad banner on Yahoo!Groups
// @include        http://*groups.yahoo.com/*
// ==/UserScript==

var paragraphs = document.getElementsByTagName("script");

for (var i = 0; i < paragraphs.length; i++) {
  if ( paragraphs[i].innerHTML.indexOf("window.yzq_d") > -1 ) {
		paragraphs[i].parentNode.style.display = "none";
		break;
	}
}
