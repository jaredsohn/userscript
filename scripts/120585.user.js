// ==UserScript==
// @name           Twitter: Fix #NewDesign
// @description    Adds a line between old and new tweets as in the old design
// @namespace      hege.cc/userscripts
// @include        *://twitter.tld/*
// The following include is there, because Google Chrome does not properly handle .tld-URLs
// @match          *://twitter.com/*
// @version        0.5
// ==/UserScript==

var s = document.createElement('style');
s.type = "text/css";
s.appendChild(document.createTextNode('.last-new-tweet { border-bottom: 1px solid; }'));
document.head.appendChild(s);

// Not using GM_addStyle(), because it is not supported by all browsers...
