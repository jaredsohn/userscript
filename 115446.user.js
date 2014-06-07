// ==UserScript==
// @name           Reddit - Click score to hide post
// @namespace      http://userscripts.org/scripts/show/115446
// @author         gavin19
// @description    Clicking in between the up/down arrows hides the post.
// @match          http://*.reddit.com/*
// @include        http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.04
// ==/UserScript==
(function () {
	var hidePost = {
		addScoreListeners: function (ele) {
			var i, len;
			for (i = 0, len = ele.length; i < len; i += 1) {
				ele[i].addEventListener('mouseover', hidePost.changeCursor, false);
				ele[i].addEventListener('click', hidePost.hideThis, false);
			}
		},
		changeCursor: function () {
			this.setAttribute('style', 'cursor:crosshair');
		},
		hideThis: function () {
			var clickEvent = document.createEvent("MouseEvents");
			clickEvent.initEvent("click", false, true);
			this.parentNode.parentNode.querySelector('.hide-button a').dispatchEvent(clickEvent);
		},
		init: function () {
			var t;
			document.body.addEventListener('DOMNodeInserted', function (e) {
				t = e.target;
				if (t.localName === 'div' && t.id && t.id.indexOf('siteTable') !== -1) {
					hidePost.addScoreListeners(t.querySelectorAll('.midcol .score'));
				}
			}, true);
			hidePost.addScoreListeners(document.querySelectorAll('.midcol .score'));
		}
	};
	if (document.body && document.querySelector('.listing-page.loggedin:not(.profile-page)')) {
		setTimeout(function () {
			hidePost.init();
		}, 500);
	}
}());