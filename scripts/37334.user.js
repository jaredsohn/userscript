// ==UserScript==
// @name           MetaFilter vi navigation
// @namespace      http://plutor.org/
// @description    Use j/k keys to scroll comments in addition to the default of ,/.
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

function mf_vi_nav(key) {
	/* Mostly stolen from the real code
	   <http://scripts.metafilter.com/mefi/navkey061208.js> */

	var modifiedKey = false;
	if (!key) key = window.event;
	if (!key.target && !key.srcElement) return;
	if (key.target && ((key.target.tagName.toLowerCase() == 'input') || (key.target.tagName.toLowerCase() == 'textarea'))) return;
	if (key.srcElement && ((key.srcElement.tagName.toLowerCase() == 'input') || (key.srcElement.tagName.toLowerCase() == 'textarea'))) return;
	if ((key.metaKey) || (key.shiftKey) || (key.altKey) || (key.ctrlKey)) modifiedKey = true;
	if (key.keyCode) key=key.keyCode;

    if (!unsafeWindow) return;

	if (!modifiedKey) {
		if (key == 74) unsafeWindow.nextArticle();
		if (key == 75) unsafeWindow.prevArticle();
    }
}

document.addEventListener('keydown', mf_vi_nav, false);