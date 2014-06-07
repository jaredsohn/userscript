// ==UserScript==
// @name           Facebook Chat Window Killer
// @author         soren121
// @description    Gets rid of Facebook's chat cosmetically from the presence bar.
// @include        http://*.facebook.com/*
// ==/UserScript==

// Luckily, we can remove everything with CSS :)
GM_addStyle(".fbDockWrapper { display: none !important; }");