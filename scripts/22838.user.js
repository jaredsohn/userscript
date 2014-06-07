// ==UserScript==
// @name           Wikipedia Short Title
// @namespace      none
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

var wst_res = /^(.+)\s[-\u2012\u2013\u2014\u2015]\s[^-\u2012\u2013\u2014\u2015]+$/.exec(document.title);
if (wst_res != null && wst_res.length == 2) document.title = wst_res[1];