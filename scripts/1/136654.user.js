// ==UserScript==
// @name           LAH un-hxxp'er
// @namespace      http://littleangelshentai.net/~hxxp
// @description    Turns LAH's hxxp links clickable!
// @include        http://littleangelshentai.net/*
// @include        http://lah.li/*
// @grant          none
// @version        1.3
// ==/UserScript==

(function() {
	var anonymizer = 'http://www.dereferer.org/?',
		links = document.getElementsByTagName('a'),
		codes = document.getElementsByClassName('code-text'),
		hxxP = /^h(?!tt)..p/i, hxxR = 'http',
		i, l;

	//http and anonymize the hxxp links
	for (i = 0, l = links.length; i < l; i++) {
		if (hxxP.test(links[i].href)) links[i].href = anonymizer + encodeURIComponent(links[i].href.replace(hxxP, hxxR));
	}

	//anonymize and linkify URLs inside code blocks
	if (codes.length) { (function() {
		var urlP = /\b(?:(?:h..ps?|ftp):\/\/|www\.)[^\s"]+(\s?" target="_blank">)?/gi,
			wwwP = /^www\./i, wwwR = 'http://www.',
			trailingnbspP = /&nbsp;$/;

		function linkifyCode(s, m) {
			if (m) return s;

			var sp = '';
			if (trailingnbspP.test(s)) {
				s = s.replace(trailingnbspP, '');
				sp = '&nbsp;';
			}

			return '<a href="' + anonymizer + encodeURIComponent(s.replace(hxxP, hxxR).replace(wwwP, wwwR)) + '" target="_blank">' + s + '</a>' + sp;
		}
		for (i = 0, l = codes.length; i < l; i++) codes[i].innerHTML = codes[i].innerHTML.replace(urlP, linkifyCode);
	}()); }
}());
