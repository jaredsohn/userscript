// ==UserScript==
// @name           window.open > GM_openInTab
// @namespace      #aVg
// @description    A new generation of popups? We'll see.
// @version        0.1.2
// @include        *
// ==/UserScript==
unsafeWindow.open = function(A) {
	return window.setTimeout(GM_openInTab, 0, /^[fh]ttp/.test(A) ? A : location.protocol + "//" + document.domain +"/" +A);
};