// ==UserScript==
// @name           2FIGHT :: Hide Sponsoring & No Popup
// @namespace      http://userscripts.org/scripts/show/170484
// @description    No Sponsoring Ads and kill the popup on 2FIGHT
// @include        http://*2fight.com*
// @version	   1.2
// ==/UserScript==

var css = '';

css += "#sponsoring { display: none !important; }";
css += "#popup_window{ display: none !important; }";

GM_addStyle(css);