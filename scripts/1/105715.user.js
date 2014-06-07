// ==UserScript==
// @name           Reddit - Replace imgur links with filmot
// @namespace      http://userscripts.org/scripts/show/105715
// @author         gavin19
// @description    Replaces imgur links with filmot mirror ones.
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.31
// ==/UserScript==
(function() {
	"use strict";
	var replaceImgur = {
		repLinks: function(ele) {
			var i, len;
			for (i = 0, len = ele.length; i < len; i += 1) {
				if (ele[i].href) {
					ele[i].href = ele[i].href.replace('imgur', 'filmot');
				}
				if (ele[i].srcurl) {
					ele[i].srcurl = ele[i].srcurl.replace('imgur', 'filmot');
				}
				if (ele[i].src) {
					ele[i].src = ele[i].src.replace('imgur', 'filmot');
				}
			}
		},
		init: function() {
			var t;
			if (document.querySelector('.comments-page')) {
				replaceImgur.repLinks(document.querySelectorAll('.comment .usertext a'));
				document.body.addEventListener('DOMNodeInserted', function(event) {
					t = event.target;
					if (t.localName === 'div' && t.classList.contains('comment')) {
						replaceImgur.repLinks(t.querySelectorAll('.usertext a'));
					}
				}, true);
			} else {
				replaceImgur.repLinks(document.querySelectorAll('a.title,.thumbnail,.madeVisible,.madeVisible img'));
				document.body.addEventListener('DOMNodeInserted', function(event) {
					t = event.target;
					if (t.localName === 'div' && (t.classList.contains('madeVisible') || t.id.indexOf('siteTable') !== -1)) {
						replaceImgur.repLinks(t.querySelectorAll('a.title,.thumbnail,.madeVisible,.madeVisible img'));
					}
				}, true);
			}
		}
	};
	replaceImgur.init();
}());
