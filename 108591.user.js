// ==UserScript==
// @name           kill adds blinx
// @namespace      gdc_
// @description    kills ads on tv blinx
// @include        http*://tv.blinkx.com/*
// ==/UserScript==

GM_addStyle("#advert_300x250 { display:none; }");
GM_addStyle("#adBanner_square { display:none; }");