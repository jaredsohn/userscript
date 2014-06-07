// ==UserScript==
// @name           Loband MSDN Library
// @namespace      http://janlay.com/
// @description    Keep Loband mode on accessing MSDN Library.
// @include        http://msdn.microsoft.com/*
// @version        0.9.4.18
// ==/UserScript==

(function() {
	var magic = '(loband)';
	var re = /(http:\/\/msdn\.microsoft\.com\/.+?\/library\/.+?)(\.aspx)$/i;

	var test = function(url) {
		return !!url && url.indexOf(magic) == -1 && re.test(url);
	};
	var replace = function(url) {
		return url.replace(re, '$1' + magic + '$2');
	}

	// check the current url...
	if(test(location.href))
		location.href = replace(location.href);

	// replace all matched links
	var links = document.links
	for(var i = 0; i < links.length; i++) {
		var link = links[i];
		if(test(link.href))
			link.href = replace(link.href);
	}
})();
