// ==UserScript==
// @name            Onens.Itunes.AutoOpener
// @namespace       Onens.Itunes.AutoOpener
// @description     Auto open iTunes
// @match           http://www.iapps.im/*
// @updateURL       https://userscripts.org/scripts/source/151871.meta.js
// @downloadURL     https://userscripts.org/scripts/source/151871.user.js
// @version         0.21
// ==/UserScript==

(function () {
	setInterval(function () {
		var els = document.getElementsByTagName('a'), len = els.length;
		for (var i = 0; i < len; i++) {
			var e = els[i], k = 'done', v = 1, u = e.getAttribute('href');
			if (e.getAttribute(k) == v) continue;
			e.setAttribute(k, v);
			if (/^http:\/\/www.iapps.im\/itunes\/(\d+)(\w+)/.test(u)) {
				if (/mac/i.test(e.innerHTML)) continue;
				var n = e.parentNode.parentNode.nextSibling.nextSibling;
				if (n && n.nodeType == 1 && /mac/i.test(n.className)) continue;
				e.removeAttribute('target');
				e.setAttribute('href', u.replace(/^http:\/\/www.iapps.im\/itunes\/(\d+)(\w+)/, 'itmss://itunes.apple.com/$2/app/id$1'));
			}
		}
	}, 500);
})();