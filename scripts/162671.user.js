// ==UserScript==
// @name        My Wikipedia
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Wikipedia
// @include     http://en.wikipedia.org/wiki/*
// @version     2
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle('body, #mw-page-base {background: #468 !important}');
GM_addStyle('#mw-page-base {margin-top: -15px !important}');
GM_addStyle('h1, h2, h3, h4, h5, h6 {border-bottom-color: #666 !important}');
GM_addStyle('a {font-weight: bold !important}');
GM_addStyle('#content {background:#edb !important; box-shadow: 0px 0px 6px 0px #000 !important; max-width:80% !important; margin: 40px auto !important; margin-top:-50px !important ;width:auto !important}');
GM_addStyle('#mw-panel, #mw-head, #mw-head-base, #p-personal, #footer, #centralNotice, #siteNotice {display: none !important}');

//