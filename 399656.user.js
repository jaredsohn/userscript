// ==UserScript==
// @name            Urlz.so links skipper FoxySpeed
// @description     Automatically skips Urlz.so ads 
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399656.meta.js
// @updateURL      http://userscripts.org/scripts/source/399656.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399656.user.js
// @author         Ismail Iddakuo
// @Original-s-    1.0 http://userscripts.org/scripts/show/170548
// @include     *urlz.so/l/*
// @grant none
// ==/UserScript==

document.location.href = document.getElementsByClassName("table-middle")[0].getElementsByTagName("a")[1].href; // Find link & redirect

