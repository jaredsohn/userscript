// ==UserScript==
// @name           Reload Digg Page
// @namespace      userscripts.org
// @description    Reload the Current Digg Page ever 5 min.
// @include        http://www.digg.com/*
// @include        http://digg.com/*
// @exclude        http://www.digg.com/users/*
// @exclude        http://digg.com/users/*
// ==/UserScript==

window.setTimeout(function() { window.location=window.location }, (1000*60*5));
