// ==UserScript==
// @name           LinkCrunch
// @namespace      linkcrunch
// @description    Links company logos directly to site, not the crunchbase article.
// @include        http://www.techcrunch.com/*
// ==/UserScript==

window.addEventListener ("load", function () {
	document.addEventListener ("click", function (e) {
		try {
			// if link wrapped around img -
			if (e.target.tagName == 'IMG' && e.target.parentNode.tagName == 'A') {
				var link = e.target.parentNode.href;

				if (link.indexOf ('http://www.crunchbase.com/') != -1) {
					var url = 'http://api.crunchbase.com/v/1/' + link.substr (26) + '.js';

					// prevent the default click action.
					e.preventDefault ();

					// and get the link from crunchbase api.
					GM_xmlhttpRequest ({
						method: 'GET',
						url: url,
						onload: function (response) {
							var data = eval ('('+response.responseText+')');

							// if no homepage_url set, then go to company-name.com
							if (data ['homepage_url'] == '')
								window.location = 'http://' + link.substr (link.lastIndexOf ('/')+1) + '.com/';
							else
								window.location = data ['homepage_url'];
						}
					});
				}
			}
		} catch (e) {
		}
	}, false);}, false);
