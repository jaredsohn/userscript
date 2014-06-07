// ==UserScript==
// @name            Quora unblocker
// @description     Removes the Quora login requirement and any nagging about it
// @namespace       http://sindresorhus.com
// @version         0.1.0
// @author          Sindre Sorhus
// @license         MIT
// @released        2013-02-17
// @updated         2013-02-17
// @match           *://quora.com/*
// @match           *://www.quora.com/*
// @run-at          document-start
// ==/UserScript==
(function (exports) {
	'use strict';

	exports.parse = function (str) {
		var query = str.split('?')[1];

		if (!query) {
			return {};
		}

		return query.trim().split('&').reduce(function (ret, param) {
			var parts = param.split('=');
			// Missing `=` is null:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			ret[parts[0]] = parts[1] === undefined ? null : decodeURIComponent(parts[1]);
			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return Object.keys(obj).map(function (key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
		}).join('&');
	};
})(window.qs = {});

(function () {
	/*jshint newcap:false camelcase:false */
	/*global qs, GM_addStyle */
	'use strict';

	var query = qs.parse(location.search);

	if (!query.share) {
		query.share = 1;
		location.search = qs.stringify(query);
		return;
	}

	document.addEventListener('DOMContentLoaded', function () {
		// silently fails in Firefox if placed outside when `document-start`
		GM_addStyle('.signup_bubble, .signup_column { display: none !important }');

		var el = document.querySelector('.signup_bar_fixed');

		if (el) {
			el.parentNode.removeChild(el);
		}
	});
})();