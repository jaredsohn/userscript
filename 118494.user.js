// ==UserScript==
// @name           Reddit - Up/downvotes hide post
// @author         gavin19
// @description    Hides post upon voting.
// @match          http://*.reddit.com/*
// @include        http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.1
// ==/UserScript==
var scoreHidesPost = {

	addArrowListeners: function (ele) {
		var clickEvent = document.createEvent("MouseEvents"), x, len;
		clickEvent.initEvent("click", false, true);
		for (x = 0, len = ele.length; x < len; x += 1) {
			ele[x].addEventListener('mouseup', function () {
				this.parentNode.parentNode.querySelector('.hide-button a').dispatchEvent(clickEvent);
			});
		}
	},
	init: function () {
		var ele = document.querySelectorAll('.midcol .arrow');
		this.addArrowListeners(ele);
		document.body.addEventListener('DOMNodeInserted', function (event) {
			if ((event.target.tagName === 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') !== -1)) {
				ele = event.target.querySelectorAll('.midcol .arrow');
				scoreHidesPost.addArrowListeners(ele);
			}
		}, true);
	}
};
if (document.body && document.querySelector('.listing-page:not(.profile-page)')) {
	setTimeout(function () {
		scoreHidesPost.init();
	}, 300);
}
