// ==UserScript==
// @name          sidereel direct linker
// @namespace     sidereel direct linker
// @onUpdate      ["div", { "innerHTML": "Testing" }]
// @description	  direct linker for sidereel
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// @include       http://www.sidereel.com/*
// ==/UserScript==

// Current as of Feb/2011

(function($) {
	var changeURLs = function() {
		$('.link-results li').each(function() {
			var $a = $(this).find('a'), a = $a[1], directUrl;
			if ($a.hasClass('redirect')) return;
			if (/sidereel\.com/.test(a.href)) {
				$.get(a.href, function(data) {
					directUrl = $(data).find('.play-link')[0].innerHTML;
					a.href = directUrl;
				});
			}
			$a.addClass('redirect');
		});
	};
	changeURLs();
	jQuery('.link-results-container').bind('DOMNodeInserted', changeURLs);
})(jQuery);

