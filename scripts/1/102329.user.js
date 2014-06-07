// ==UserScript==
// @name           Remove Guille Music
// @namespace      Choxiee
// @description    Removes the annoying Guille Music on /v/
// @include        http://boards.4chan.org/v/*
// ==/UserScript==
d = document.getElementsByTagName("embed");
if(d[0].src=="http://www.youtube.com/v/5mRKXhwxxLQ&autoplay=1&loop=1"){d[0].src = "";}