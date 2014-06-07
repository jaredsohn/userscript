// ==UserScript==
// @name        Urlz.so links skipper
// @description Automatically skips ads
// @include     *urlz.so/l/*
// @version     1.0
// @grant none
// ==/UserScript==

document.location.href = document.getElementsByClassName("table-middle")[0].getElementsByTagName("a")[1].href; // Find link & redirect