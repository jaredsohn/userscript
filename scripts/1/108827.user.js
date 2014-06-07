// ==UserScript==
// @name          Reddit - Auto-hide image expando upon closing [RES]
// @namespace     http://userscripts.org/scripts/show/108827
// @author        gavin19
// @description   [RES] only. Collapsing an image expando hides the entire post.
// @match         http://reddit.com/*
// @match         https://reddit.com/*
// @match         http://*.reddit.com/*
// @match         https://*.reddit.com/*
// @include        http://reddit.com/*
// @include         https://reddit.com/*
// @include        http://*.reddit.com/*
// @include         https://*.reddit.com/*
// @version       1.03
// ==/UserScript==
var hideCollapsed = {
	init: function() {
		var expando = document.querySelectorAll('a.expando-button');
		document.body.addEventListener('DOMNodeInserted', function(event) {
			if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') != -1)) {
				expando = event.target.querySelectorAll('a.expando-button');
				hideCollapsed.addListeners(expando);
			}
		});
		hideCollapsed.addListeners(expando);
	},
	addListeners: function(expando) {
		var ele, clickEvent = document.createEvent("MouseEvents");

		function addListener() {
			ele = this;
			ele.removeEventListener('click', addListener, false);
			if (ele.parentNode.parentNode.querySelector('.expanded')) {
				ele.parentNode.parentNode.querySelector('.expanded').addEventListener('click', function() {
					clickEvent.initEvent("click", false, true);
					ele.parentNode.parentNode.querySelector('.hide-button a').dispatchEvent(clickEvent);
				});
			}
		}
		for (var i = 0, len = expando.length; i < len; i += 1) {
			expando[i].addEventListener('click', addListener, false);
		}
	}
}
if (document.body) {
	setTimeout(function() {
		hideCollapsed.init();
	}, 3000);
}
else {
	window.addEventListener("load", function() {
		hideCollapsed.init();
	}, false);
}