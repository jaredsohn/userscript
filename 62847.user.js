// ==UserScript==
// @name           Url Recover
// @namespace      net.luosheng.urlrecover
// @description    Recover the url for blocked 3rd party url shorten services, eg. bit.ly.
// @include        *
// ==/UserScript==

(function () {
	var urls = ['http://bit.ly', 'http://j.mp'];
	var urlRecover = 'http://url-recover.appspot.com/?url=';
	var as = document.getElementsByTagName('a');
	var len;
	for (var i = 0; len = as.length, i < len; i++) {
		var a = as[i];
		for (var j = 0; j < urls.length; j++) {
			if (a.href && a.href.indexOf(urls[j]) == 0) {
				a.href = urlRecover + escape(a.href);
			}
		}
	}
})();