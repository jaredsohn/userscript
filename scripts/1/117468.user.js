// ==UserScript==
// @name           Hide Gmail New Look Feedback
// @version        1.6.0
// @namespace      http://gm.mikepfirrmann.com/
// @include        *://mail.google.com/mail/*
// @updateURL      https://www.userscripts.org/scripts/source/117468.meta.js
// @installURL     https://www.userscripts.org/scripts/source/117468.user.js
// ==/UserScript==

var attempts=0,
	maxAttempts=40;

function getNode() {
	var selectors=['.GcwpPb-MEmzyf', '.w-asK.w-atd'],
		i=null;

	for (i=selectors.length-1; i>=0; --i) {
		try {
			return document.querySelector(selectors[i]);
		} catch (e) {}

		try {
			return document
				.getElementById('canvas_frame')
				.contentWindow
				.document
				.querySelector(selectors[i]);
		} catch (e) {}
	}

	return false;
}

function tryHide() {
	var node=null;

	if (attempts>=maxAttempts) return;

	node=getNode();
	if (node) {
		node.style.display='none';
		return;
	}

	++attempts;

	setTimeout(tryHide, 1000);
}

tryHide();