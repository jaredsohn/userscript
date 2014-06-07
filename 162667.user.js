// ==UserScript==
// @name        My IMDB
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter IMDB.com
// @include     http://www.imdb.com/*
// @version     1
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle('body {background: #468 !important}');
GM_addStyle('#pagecontent, #main {background: #edb !important}');
GM_addStyle('h2, h3 {color: #642 !important}');
GM_addStyle('hr {border-color: #666 !important; border-style: solid !important}');
GM_addStyle('.see-more {border-top-width: 0px !important}');
GM_addStyle('a {font-weight: bold !important}');
GM_addStyle('#footer, #news-disclaimer, #nb_personal, .nb_extra, #bottom_ad_wrapper {display: none !important}');

//