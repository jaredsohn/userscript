// ==UserScript==
// @name       Hide Gmail pop-up box.
// @version    1.0
// @description  Hides the box that pops up when you hover of someones name in Gmail.
// @match      https://mail.google.com/*
// @copyright  2013+, JoeSimmons
// ==/UserScript==

GM_addStyle('body > div.tq > iframe { display: none !important; }');