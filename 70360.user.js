// ==UserScript==
// @name        Greasemonkey Gmail Chat Muzzle
// @namespace   http://somethingopensource.org
// @description A greasmonkey Gmail Lab Muzzle replacement
// @include     https://mail.google.com/*
// @include     http://mail.google.com/*
// ==/UserScript==

GM_addStyle(".vl { display: none !important; }");
GM_addStyle(".vF { display: none !important; }");
GM_addStyle(".vm { display: none !important; }");

// NOTE:  These needed to be all separate for this to work correctly, haven't
// really ventured as to why, but it works!

