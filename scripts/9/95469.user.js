// ==UserScript==
// @name           slashdotfix
// @namespace      http://intomec.com/mark0978
// @description    Make slashdot more readable
// @include        http://*.slashdot.org/story/*
// ==/UserScript==

fh = document.getElementById('firehose');
fh.style.marginRight = 0;
fh.style.fontSizeAdjust = 1.05;
fh.style.lineHeight = 1.8;

