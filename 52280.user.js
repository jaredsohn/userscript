// ==UserScript==
// @name           getsajobimage
// @namespace      http://userscripts.org/users/96477
// @description    Loads getsajob images inline from atom feed in google reader
// @include        http://www.google.com/reader/view/
// ==/UserScript==

(function() {
	function myjob() {
		var loadImage = function() {
			var link = $('#current-entry')
				.find('a[href^=http://www\.getsajob\.com/index\.php]');
			if (!link.length)
				return;
			link.each(function() {
				$(this).replaceWith(
					'<img src="http://www.getsajob.com/images/' +
						$(this).attr('href').substring(36) +
					'.jpg" title="' + $(this).text() +
					'"/>');
			});
		}

		window.addEventListener('click', loadImage, false);
		window.addEventListener('keyUp', loadImage, false);
	}

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',
		onload: function(r){ eval(r.responseText); myjob(); }
	});
})();
