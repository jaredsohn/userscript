// ==UserScript==
// @name			DivShare skip ads
// @namespace		http://www.gingerbeardman.com
// @description		Skips the ads and goes straight to the download
// @include			http://www.divshare.com/*
// @include			http://divshare.com/*
// ==/UserScript==

(function changeLinks() {
	var css = [
	 'div.wrapper div iframe, div.sider_divider, #ad, #ads { display: none; }',
	 '' /* an empty line */
	].join('');
	GM_addStyle(css);
	
	var links = document.getElementsByTagName('a');
	for (var i=0; i < links.length; i++) {
		if (links[i].href.indexOf('/i/') != -1 ) {
			links[i].href = links[i].href.replace('/i/', '/download/launch/');
			window.location.href = links[i].href.replace('/i/', '/download/launch/');
		}
	}

})();
