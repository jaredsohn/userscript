// ==UserScript==
// @name           OnlineClock middle table fix
// @namespace      http://online.net/*
// @description    Fixes the screen so it doesn't have the scroll bar
// @include        http://onlineclock.net/
// ==/UserScript==

var tables = document.getElementsByTagName("table");
tables[1].setAttribute('height', '95%');