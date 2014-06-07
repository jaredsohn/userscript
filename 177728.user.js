// ==UserScript==
// @name           IRCCloud AlwaysMarkRead
// @namespace      http://github.com/raneksi
// @description    Always mark a buffer read when opened, similarly to irssi
// @match          https://www.irccloud.com/*
// @version        0.0.2
// @updateURL      https://userscripts.org/scripts/source/177728.meta.js
// @downloadURL    https://userscripts.org/scripts/source/177728.user.js
// ==/UserScript==

var inject = function(fn) {
	var script = document.createElement("script");
	script.textContent = "(" + fn.toString() + ")();";
	document.head.appendChild(script);
};

inject(function() {
	var bufferClick = function() {
		SESSIONVIEW.model.currentBuffer.read();
	};

	var bindClick = function() {
		SESSIONVIEW.model.bind('currentBufferChange', bufferClick, SESSIONVIEW);
	};

	var readyCheck = function(done) {
		(function() {
			if (window.hasOwnProperty('SESSIONVIEW')) {
				done();
			} else {
				setTimeout(arguments.callee, 25);
			}
		})();
	};

	readyCheck(bindClick);
});