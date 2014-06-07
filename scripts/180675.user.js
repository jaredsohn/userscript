// ==UserScript==
// @name       Chrome Flash Fix
// @version    1.0
// @description  This script is a workaround for Chrome that fixes the 'white flash' when loading pages. This is just an idea put into a userscript. Original author: https://code.google.com/p/chromium/issues/detail?id=119871#c9
// @match     	*://*/*
// @run-at document-start
// @run-at document-end
//
// @updateUrl       https://userscripts.org/scripts/source/180675.meta.js
// @downloadUrl     https://userscripts.org/scripts/source/180675.user.js
// ==/UserScript==

if(document.readyState == 'loading') {
    document.documentElement.style.backgroundColor = '#A4A4A4';
} else {
    document.documentElement.style.backgroundColor = '';
}