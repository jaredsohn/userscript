// ==UserScript==
// @name           Clear Recently Viewed LInks
// @namespace      http://www.reddit.com/
// @description    Automatically clears Reddit's recently viewed links on every page.
// @include        http://www.reddit.com/*
// ==/UserScript==

window.setTimeout("clear_clicked_items();", 60);