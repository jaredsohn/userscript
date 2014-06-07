// ==UserScript==
// @name           Google Reader vertical space maximiser
// @namespace      http://lieschke.net/projects/greasemonkey/
// @description    Maximises the height of the reading pane in Google Reader.
// @include        http*://www.google.com/reader/view/*
// ==/UserScript==

(function() {
	var css = '@namespace url(http://www.w3.org/1999/xhtml);';
	css += '#main, #settings-frame { top: 0; }';
	css += '.gbh, #gbar, #global-info, #lhn-add-subscription-section, #logo-container, #search, #viewer-footer { display: none !important; }';
	css += '.round-box .bl, .round-box .br { background: none; }';
	css += 'div.keyboard-help-banner { top: 10px !important; }';

	if (typeof GM_addStyle != 'undefined') {
		GM_addStyle(css);
	} else if (typeof addStyle != 'undefined') {
		addStyle(css);
	} else {
		var node = document.createElement('style');
		node.type = 'text/css';
		node.appendChild(document.createTextNode(css));
		document.getElementsByTagName('head').appendChild(node);
	}
})();