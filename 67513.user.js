// ==UserScript==
// @name           GC Remove Disclaimer
// @namespace      Geocaching
// @description    V1.2.060610 - Removes the disclaimer and frees up the space
// @include        http://*.geocaching.com/*
// ==/UserScript==


GM_addStyle(".TermsWidget { display:none !important; }");
GM_addStyle(".CacheDisclaimerTable { display:none; }");