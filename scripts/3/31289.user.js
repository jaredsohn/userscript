// ==UserScript==
// @name           Amigofish audio only
// @namespace      tag:maeki.org
// @description    Open rating and prediction pages defaulting to audio only
// @include        http://www.amigofish.com/*
// @include        http://amigofish.com/*
// ==/UserScript==

var allLinks = document.getElementsByTagName('a');
for (i=0;i<8;i++) {
	if (!(allLinks[i].textContent.match('Show all'))) {
		if(allLinks[i].href.match('/podcast/rate')) {
			allLinks[i].href='http://www.amigofish.com/catcher/podcast/rate?type=audio';
		}
		else if(allLinks[i].href.match('/podcast/my_ratings') ) {
			allLinks[i].href='http://www.amigofish.com/catcher/podcast/my_ratings?type=audio';
		}
		else if(allLinks[i].href.match('/podcast/predictions')) {
			allLinks[i].href='http://www.amigofish.com/catcher/podcast/predictions?type=audio';
		}
	}
}