// ==UserScript==
// @name           AutoPagerize Filter for gist
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Rewriting posted time if using "AutoPagerize".
// @include        http://gist.github.com/*
// @include        https://gist.github.com/*
// ==/UserScript==

(function() {
	$ = unsafeWindow.$;
	
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt) {
		if ($.fn.relatizeDate) {
			$('.autopagerize_page_info:last + div .relatize').relatizeDate();
		}
	},false);
})();
