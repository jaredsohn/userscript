// ==UserScript==
// @name           Facebook AutoRedirect
// @namespace      http://userscripts.org
// @include        http://m.facebook.com/*
// ==/UserScript==

var loc=document.location.href;
loc=loc.replace("m.facebook","www.facebook");
loc=loc.replace("w2m","m2w");
document.location=loc;