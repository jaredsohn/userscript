// ==UserScript==
// @name        wakarimasen
// @namespace   wakarimasen
// @include     http://boards.4chan.org/b/*
// @version     1
// @grant none
// ==/UserScript==

document.getElementsByTagName("style")[4].innerHTML = ""
x = document.getElementsByTagName("style");
x[x.length - 1].outerHTML = "";