// ==UserScript==
// @name        UVA Fixed
// @namespace   tungnk1993
// @include     http://uva.onlinejudge.org/*
// @version     1
// ==/UserScript==

var cur = document.getElementsByTagName('iframe');
cur[0].height = "2000";