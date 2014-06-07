// ==UserScript==
// @name           Remove Pioneer Woman comments
// @namespace      http://userscripts.org/users/3034
// @description    Hides all comments on thepioneerwoman.com, making pages load much faster.
// @include        http://thepioneerwoman.com/*
// @include        http://*.thepioneerwoman.com/*
// ==/UserScript==

GM_addStyle('.commentlist { display:none; }');