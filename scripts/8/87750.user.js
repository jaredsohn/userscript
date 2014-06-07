// ==UserScript==
// @name           4chan Linkify
// @namespace      csimi
// @author         csimi
// @description    Linkification of text links.
// @homepage       http://userscripts.org/users/156405/scripts
// @version        2.0.5
// @updateURL      http://userscripts.org/scripts/source/87750.meta.js
// @icon           http://i.imgur.com/JHVzK.png
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// ==/UserScript==

(function () {
	var self = {
		ready: function () {
			var MutationObserver;
			if (MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.OMutationObserver) {
				observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						for (var i = 0; i < mutation.addedNodes.length; i++) {
							self.check(mutation.addedNodes[i]);
						}
					}); 
				});
				observer.observe(self.qs('body'), {
					childList: true,
					subtree: true
				});
			}
			else {
				document.addEventListener('DOMNodeInserted', function (event) {
					self.check(event.target);
				}, false);
			}
			
			var func = function () {
				self.incrementalize(self.qsa('.board > .thread > .postContainer'));
			};
			if (document.readyState == 'loading') {
				document.addEventListener('DOMContentLoaded', func, false);
			}
			else func();
			
			if (typeof GM_registerMenuCommand == 'function' && typeof GM_getValue == 'function' && typeof GM_setValue == 'function' && typeof GM_deleteValue == 'function') {
				var menucommand = function () {
					if (!GM_getValue('blank')) {
						GM_setValue('blank', true);
						alert('Links now open in a blank window.');
					}
					else {
						GM_deleteValue('blank');
						alert('Links don\'t open in a blank window anymore.');
					}
				};
				GM_registerMenuCommand('4chan Linkify toggle blank window', menucommand, '');
			}
		},
		qs: function (a, b) {
			return (b || document).querySelector(a);
		},
		qsa: function (a, b) {
			return (b || document).querySelectorAll(a);
		},
		check: function (node) {
			if (node.nodeType && node.nodeType == 1 && node.classList.contains('postContainer')) {
				var bq = self.qs('blockquote', node);
				if (!bq || !bq.parentNode || !bq.childNodes || !bq.childNodes.length) return;
				for (var i = 0; i < bq.childNodes.length; i++) {
					self.process(bq.childNodes[i]);
				}
			}
			if (node.nodeType && node.nodeType == 1 && node.nodeName.toLowerCase() == 'blockquote') {
				for (var i = 0; i < node.childNodes.length; i++) {
					self.process(node.childNodes[i]);
				}
			}
		},
		create: function (s) {
			node = document.createElement('a');
			node.className = 'chanlinkify';
			node.href = s;
			node.appendChild(document.createTextNode(s));
			if (typeof GM_getValue == 'function' && GM_getValue('blank')) node.target = '_blank';
			return node;
		},
		next: function (node) {
			if (!node.nextSibling) return;
			if (node.nextSibling.nodeName.toLowerCase() == 'wbr') {
				node.appendChild(node.nextSibling);
			}
			var sib = node.nextSibling;
			if (sib && sib.nodeType == 3) {
				var m = sib.nodeValue.match(/^[^\s]+/);
				if (!m) return;
				var s = m[0];
				node.href = node.textContent+s;
				node.appendChild(document.createTextNode(s));
				if (sib.nodeValue.length == s.length) {
					node.parentNode.removeChild(sib);
				}
				else {
					sib.nodeValue = sib.nodeValue.substring(s.length);
				}
				self.next(node);
			}
		},
		process: function (node) {
			if (node.nodeType == 1 && node.childNodes.length && (node.classList.contains('quote') || node.nodeName.toLowerCase() == 's')) return self.process(node.childNodes[0]);
			if (node.nodeType != 3) return;
			var m;
			m = node.nodeValue.match(/[a-zA-Z][a-zA-Z0-9+-.]+:\/\/[^\s]+/);
			if (!m) m = node.nodeValue.match(/mailto:[^\s]+/);
			if (!m) m = node.nodeValue.match(/magnet:[^\s]+/);
			if (!m) m = node.nodeValue.match(/news:[^\s]+/);
			if (m && node.parentNode.nodeName.toLowerCase() != 'a') {
				var s = m[0];
				var a = self.create(s);
				if (node.nodeValue.length == s.length) {
					node.parentNode.replaceChild(a, node);
				}
				else {
					var pos = node.nodeValue.indexOf(s);
					if (pos != 0) node.parentNode.insertBefore(document.createTextNode(node.nodeValue.substring(0, pos)), node);
					node.parentNode.insertBefore(a, node);
					node.nodeValue = node.nodeValue.substring(pos+s.length);
					if (!node.nodeValue) node.parentNode.removeChild(node);
				}
				self.next(a);
			}
		},
		incrementalize: function (nodes) {
			var i = 0;
			var func = function () {
				for(var j = 0; i < nodes.length; i++, j++) {
					self.check(nodes[i]);
					if (j == 10) break;
				}
				if (i < nodes.length) window.setTimeout(func, 10);
			};
			func();
		},
	};
	self.ready();
})();
