// ==UserScript==
// @name     ITC.UA no-js fix
// @namespace   http://userscripts.org/users/22333
// @include  http://itc.ua/*
// @description ITC.UA opacity fix for loading site without js.
// @version     1.0
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle ( "body.no-js .post, body.no-js #display-mode { opacity: 100 !important;} " );
