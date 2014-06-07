// ==UserScript==
// @id             TwitterQuickLinks
// @name           Twitter Quick Links
// @namespace      http://jacky.seezone.net/twitterQuickLinks
// @description    press 1-9 to open links in current tweet in background tab
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

function linkKey(ev){
	if(/input|textarea/.test(ev.target.tagName.toLowerCase())) return;
	var k = String.fromCharCode(ev.keyCode ||ev.which);
	if(k >= "1" && k <= "9"){
		var i = parseInt(k,10)-1,
			link = document.querySelectorAll("div.hovered-stream-item a.twitter-timeline-link");
		link.length>i && link[i] && GM_openInTab(link[i].href);
	}
}

document.addEventListener('keypress', linkKey, true);
