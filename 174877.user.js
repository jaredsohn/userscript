// ==UserScript==
// @id             YoutubeTweak@Lunatrius
// @name           Youtube Tweak
// @version        0.5
// @namespace      AbgPiyi
// @author         AbgPiyi <abgpiyi@gmail.com>
// @description    Add a delete button.
// @match          http://www.youtube.com/
// @match          http://www.youtube.com/?*
// @match          http://www.youtube.com/watch*
// @match          http://www.youtube.com/feed/*
// @match          https://www.youtube.com/
// @match          https://www.youtube.com/?*
// @match          https://www.youtube.com/watch*
// @match          https://www.youtube.com/feed/*
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/?*
// @include        http://www.youtube.com/watch*
// @include        http://www.youtube.com/feed/*
// @include        https://www.youtube.com/
// @include        https://www.youtube.com/?*
// @include        https://www.youtube.com/watch*
// @include        https://www.youtube.com/feed/*
// @icon           data:image/png;base64,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
// @run-at         document-end
// ==/UserScript==

/*jslint devel: true, browser: true, regexp: true, continue: true, plusplus: true, maxerr: 50, indent: 4 */
/*global unsafeWindow: false */

(function () {
	'use strict';

	var $, jQueryLoaded, main, addButtons, script;

	jQueryLoaded = function (event) {
		$ = unsafeWindow.$;

		if ($ !== undefined && $ !== null) {
			main();
		}
	};

	main = function (event) {
		var header, match, text, html, name;

		$('head').append('<style id="dynamicStylesheet"></style>');

		$('#dynamicStylesheet').text([
			'.yt-tweak-button {',
			'position: absolute;',
			'top: 32px;',
			'right: 2px;',
			'width: 12px;',
			'height: 12px;',
			'cursor: pointer;',
			'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAACVBMVEX///9mZmb///+ofUk6AAAAAXRSTlMAQObYZgAAADFJREFUeNpljkEKAEAIAp3+/+jFLYRoTg2KJBEkKmD5Tgv4gEnMJG11JLU9cKcD650HPsQAzejNIlMAAAAASUVORK5CYII=");',
			'}',
			'.yt-tweak-button:hover {',
			'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAACVBMVEX///8AAP////+g6om+AAAAAXRSTlMAQObYZgAAADFJREFUeNpljkEKAEAIAp3+/+jFLYRoTg2KJBEkKmD5Tgv4gEnMJG11JLU9cKcD650HPsQAzejNIlMAAAAASUVORK5CYII=");',
			'}'
		].join('\n'));

		addButtons();
	};

	addButtons = function () {
		$('span.dismiss-menu-choice').each(function (id, node) {
			var container;

			container = $(node).closest('.feed-item-dismissable');

			if (container.find('.yt-tweak-button').size() === 0) {
				$('<div></div>')
					.attr('class', 'yt-tweak-button')
					.click(function (e) {
						node.click();
					})
					.appendTo(container);
			}
		});

		unsafeWindow.setTimeout(addButtons, 5000);
	};

	// add jQuery
	$ = unsafeWindow.$;
	script = document.createElement('script');
	script.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
	script.addEventListener('load', jQueryLoaded, false);
	document.body.appendChild(script);
}());