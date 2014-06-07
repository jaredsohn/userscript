// ==UserScript==
// @name         Better Links 2ch
// @namespace    http://akr.tw/
// @description  Fixes the links on 2ch.net BBS. Displays anchor content directly.
// @author       akiratw
// @version      1.1
// @license      MIT License
// @include      http://*.2ch.net/*
// @include      http://*.bbspink.com/*
// @include      http://*.open2ch.net/*
// ==/UserScript==

var init = function (doc) {
	doc = doc || document;

	fixLinks(doc).fix();
	displayAnchor(doc).init();
};

var fixLinks = function (doc) {
	var self = {};

	self.completeLinks = function () {
		var responses = doc.querySelectorAll('dl.thread dd'),
			regex = /(?:[^h])(ttps?:\/\/[\x21-\x7E]+)/ig,
			replace = '<a href="h$1">h$1</a>';

		dom(responses).each(function (response) {
			response.innerHTML = response.innerHTML.replace(regex, replace);
		});
	};

	self.skipLinkRedirect = function () {
		var links = doc.querySelectorAll('dl.thread dd a'),
			regex = /((www\d?\.|)ime\.(nu|st)\/|pinktower\.com\/|jump\.2ch\.net\/\?)/,
			replace = '';

		dom(links).each(function (link) {
			link.setAttribute('href', link.href.replace(regex, replace));
		});
	};

	return {
		fix: function () {
			self.completeLinks();
			self.skipLinkRedirect();
		}
	};
};

var displayAnchor = function (doc) {
	var self = {};

	self.bindEvents = function () {
		var links = doc.querySelectorAll('dl.thread dd a'),
			regex = /^&gt;&gt;\d+$/;

		dom(links).each(function (link) {
			if (!regex.test(link.innerHTML)) return;
			link.addEventListener('click', self.toggleAnchor, false);
		});
	};

	self.toggleAnchor = function (event) {
		event.preventDefault();

		var link = event.target,
			href = link.getAttribute('href'),
			anchor = link.nextSibling;

		if (anchor.tagName === 'DIV' && anchor.getAttribute('class').indexOf('bl2ch_anchor') > -1) {
			dom(anchor).toggle();
			return;
		}

		anchor = document.createElement('div');
		anchor.setAttribute('class', 'bl2ch_anchor');
		anchor.innerHTML = '<strong>Loading...</strong>';

		link.parentNode.insertBefore(anchor, link.nextSibling);

		dom(anchor)
			.addStyle({
				padding: '5px 5px 0 5px',
				borderLeft: '5px solid #CCC',
				color: '#666',
				fontSize: '13px'
			})
			.ajaxLoad(href, 'dl.thread', function() { init(anchor); });
	};

	return {
		init: function () {
			self.bindEvents();
		}
	};
};

var dom = function (dom) {
	return {
		each: function (func, index) {
			for (var i = dom.length - 1; i >= 0; i--) {
				func(dom[i], i);
			}
			return this;
		},
		toggle: function () {
			if (dom.style.display === 'none') {
				dom.style.display = 'block';
			} else {
				dom.style.display = 'none';
			}
			return this;
		},
		addStyle: function(styleArray) {
			for (var prop in styleArray) {
				dom.style[prop] = styleArray[prop];
			}
			return this;
		},
		ajaxLoad: function (url, selector, callback) {
			var xhr = new XMLHttpRequest();
			var charset = document.charset || document.characterSet;

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4 || xhr.status !== 200) return;

				var wrapper = document.createElement('div');
				wrapper.innerHTML = xhr.responseText.replace(/<script[^>]*>([\\S\\s]*?)<\/script>/img, '');
				dom.innerHTML = wrapper.querySelectorAll(selector)[0].outerHTML;

				if (typeof callback === 'function') callback();
			};

			xhr.open('GET', url, true);
			xhr.overrideMimeType('text/html; charset=' + charset);
			xhr.send();

			return this;
		}
	};
};

init();
