// ==UserScript==
// @name           LDR - Emphasize Authors
// @namespace      http://iwamot.com/
// @include        http://reader.livedoor.com/reader/*
// @include        http://fastladder.com/reader/*
// @version        1.1.0
// ==/UserScript==

(function(unsafeWindow){
	const AUTHORS = ['Hogehoge', 'Piyopiyo'];  // case sensitive
	const COLOR = '#fc8181';

	if (!document.querySelector) {
		alert('LDR - Emphasize Authors: unsupported browser');
		return;
	}

	window.addEventListener('load', onLoad, false);

	function onLoad() {
		GM_addStyle([
			'.LDREA_author, .LDREA_item h2 a {color: ' + COLOR + ' !important;}',
			'.LDREA_author {font-weight: bold !important;}'
		].join(''));

		unsafeWindow.register_hook('after_printfeed', function(feed){
			feed.items.forEach(function(item){
				if (!item.author) return;

				if (!AUTHORS.some(function(author){
					return (author == item.author);
				})) return;

				(function(div_id){
					try {
						if (!unsafeWindow.hasClass(div_id, 'LDREA_item')) {
							unsafeWindow.addClass(div_id, 'LDREA_item');
						}

						var authorElementId = div_id + '_author';
						if (!document.querySelector('#' + authorElementId)) {
							document.querySelector('#' + div_id + ' .author').id = authorElementId;
						}
						if (!unsafeWindow.hasClass(authorElementId, 'LDREA_author')) {
							unsafeWindow.addClass(authorElementId, 'LDREA_author');
						}
					} catch (e) {
						var self = arguments.callee;
						setTimeout(function(){self(div_id);}, 500);
					}
				})('item_' + item.id);
			});
		});
	}

	if (isOpera()) {
		function GM_addStyle(styleText) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerText = styleText;
			document.querySelector('head').appendChild(style);
		}
	}

	function isOpera() {
		return (!!window.opera);
	}
})(this.unsafeWindow || window);
