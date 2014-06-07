// ==UserScript==
// @name           TrendsMustDie
// @namespace      http://jasonfager.com
// @description    Gets rid of the annoying "Trending" box on Twitter.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

GM_addStyle('#trends { display: none; }');
GM_addStyle('.trends-inner { display: none; }');
