// ==UserScript==
// @name           Google Reader - Hide unread counts and styles
// @version        1.0.1
// @namespace      http://willrossi.com 
// @author         willrossi
// @description    Hide unread counts and indicators (including bold font faces) on Google Reader.
// @include        http*://www.google.*/reader/*
// ==/UserScript==

(function() {
	var css = "\
	.unread, .unread *, #sub-tree-header, #recommendations-tree .lhn-section-primary { font-weight: normal !important; } \
	.title .unread, .overview-segment .label span, #viewer-all-new-links, #entries-status { display: none !important; }"

	var head, style;
	head = document.getElementsByTagName('head');
	
	if (head.length > 0) {
		head = head[0];
		
		style = document.createElement('style');
		style.innerHTML = css;
		head.appendChild(style);
	}
})();
