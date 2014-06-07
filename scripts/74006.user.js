// ==UserScript==
// @name        Facebook Repairs
// @description Subtle Facebook repairs.
// @copyright   2010 Apphacker apphacker.com
// @license     MIT License
// @version     0.0.1
// @namespace   http://apphacker.com
// @include     *facebook.com*
// @run-at document-start
// ==/UserScript==

GM_addStyle("div#sidebar_ads { display: none !important; } ");
GM_addStyle("div#rightCol { display: none !important; } ");
GM_addStyle("div#pagelet_eventbox { display: none !important; } ");
GM_addStyle("div#right_column { width: 700px !important; } ");
