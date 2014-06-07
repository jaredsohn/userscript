// ==UserScript==
// @name           Reddit - remove redirect
// @namespace      http://arvixx.blogspot.com
// @description    Removes the irritating redirect on reddit pages
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

window.addEventListener('load', function() {
	const offending_attribute = 'onmousedown';
	for (var i = 0, link = null; link = document.links[i]; i++)
		if (link.hasAttribute(offending_attribute) && link.getAttribute(offending_attribute).match(/^return rwt\(/))
			link.removeAttribute(offending_attribute);
}, true);