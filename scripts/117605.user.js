// ==UserScript==
// @id             google_icon_return
// @name           Google+ Icon Return
// @description    Get back the Google+ icon.
// @author         SkyArrow
// @website        http://userscripts.org/scripts/show/106681
// @namespace      http://zespia.twbbs.org
// @version        1.0.1
// @include        https://plus.google.com/*
// @exclude        https://plus.google.com/ripples/*
// ==/UserScript==

(function(){
	var head = document.getElementsByTagName('head')[0],
		links = document.getElementsByTagName('link'),
		icon = document.createElement('link');
	icon.rel = 'shortcut icon';
	icon.type = 'image/x-icon';
	icon.href = 'https://sites.google.com/site/hoverzoomplus/sources/4yph.ico';
	for (i=0; i<links.length; i++){
		var link = links[i];
		if (link.rel == 'shortcut icon'){
			head.removeChild(link);
			head.appendChild(icon);
		}
	}
})();