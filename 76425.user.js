// ==UserScript==
// @name           Allow lyrics selection on LyricWiki
// @description    Re-enables lyrics selection on LyricWiki pages. If you're on Windows, use the Edit menu to copy.
// @author        Dave Cortright
// @namespace      kpao.org
// @version        1.01
// @date            2011-07-04
// @include        http://lyrics.wikia.com/*
// ==/UserScript==

GM_addStyle(".lyricbox {-moz-user-select:auto !important;cursor:auto !important;}");

document.getElementsByTagName('body')[0].unbind('contextmenu');
window.unbind('keypress');
