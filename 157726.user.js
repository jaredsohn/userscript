// ==UserScript==
// @name           Reddit - Add title attribute to link flair
// @namespace      http://userscripts.org/
// @author         gavin19
// @description    Hovering link flair will popup the full content
// @match          http://*.reddit.com/*
// @include        http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @include        https://*.reddit.com/*
// @version        1.00
// ==/UserScript==
(function () {
	var showTitle = {
		addTitles: function (ele) {
			var i, len;
			for (i = 0, len = ele.length; i < len; i += 1) {
				ele[i].setAttribute('title', ele[i].textContent);
			}
		},
		init: function () {
			var t;
			document.body.addEventListener('DOMNodeInserted', function (e) {
				t = e.target;
				if (t.localName === 'div' && t.id && t.id.indexOf('siteTable') !== -1) {
					showTitle.addTitles(t.querySelectorAll('.link .linkflairlabel'));
				}
			}, true);
			showTitle.addTitles(document.querySelectorAll('.link .linkflairlabel'));
		}
	};
	if (document.body && document.querySelector('.linklisting')) {
		setTimeout(function () {
			showTitle.init();
		}, 500);
	}
}());
