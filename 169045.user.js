// ==UserScript==
// @name           NewsBlur BG Open
// @id             newsblur_bg_open_dcsohl
// @version        0.1.3
// @author         dcsohl - Dan
// @run-at         document-end
// @grant          GM_openInTab
// @namespace      http://www.anent.org/newsblur/bgopen
// @description    Open links from Newsblur In Background
// @include        http://dev.newsblur.com/*
// @include        http://www.newsblur.com/*
// @include        http://newsblur.com/*
// @include        https://dev.newsblur.com/*
// @include        https://www.newsblur.com/*
// @include        https://newsblur.com/*
// ==/UserScript==

function linkKey(ev){
	if(/input|textarea/.test(ev.target.tagName.toLowerCase())) return;
	var k = String.fromCharCode(ev.keyCode ||ev.which);
	if(k == "O"){
		var link = document.querySelectorAll("div.NB-story-title.NB-selected a.story_title");
		if (link.length > 0) {
			GM_openInTab(link[0].href);
		}
	} else if (k == "u") {
		ev.preventDefault();
		ev.stopPropagation();
	}
}

document.addEventListener('keypress', linkKey, true);