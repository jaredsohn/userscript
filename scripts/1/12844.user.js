// ==UserScript==
// @name           Java 6 Documentation Redirect
// @namespace      http://freecog.net/2007/
// @description    Redirects to the Java SE 6 documenation from older pages.
// @include        http://java.sun.com/j2se/*
// ==/UserScript==

var old_loc = loc = window.location.href;
loc = loc.replace(/\/j2se\/[^\/]+\/docs\//, "/javase/6/docs/");
if (loc != old_loc) window.location.replace(loc);