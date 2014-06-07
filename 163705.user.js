// ==UserScript==
// @name       Mind42 Remove Ads Fork.
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Remove Right Side Ads on Mind42.com
// @include     http://mind42.com*
// @match      http://mind42.com/*
// @copyright  2013+, eagleeyez
// ==/UserScript==

var overrideCSS = " \
#sidebar { display: none; } \
#content.sidebar2 { margin-right: 0; } \
#content.sidebar1 { margin-right: 0; } \
";
GM_addStyle(overrideCSS);