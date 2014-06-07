// ==UserScript==
// @name        Fix Links on music.download.com
// @namespace   http://barkingstars.com/
// @description The URLs on music.download.com are full of rubbish.  This links directly to the MP3s
// @include     http://music.download.com/*
// ==/UserScript==

(function() {
    for (var i=0; i<document.links.length; i++) {
	if (document.links[i].href.match(/^http:\/\/dw.com.com/i)) {
		myRegExp = /desturl=([\w\d%.-]*)/i;
		newUrl = myRegExp.exec(document.links[i].href);
		if(newUrl[1].length > 0) {
			document.links[i].href = unescape(newUrl[1]);
		}
	}
    }
})();

