// ==UserScript==
// @name           Remove v2ex ads
// @namespace      http://v2ex.com
// @include        http://v2ex.com/*
// ==/UserScript==


a = document.getElementsByClassName('box')[1]
b = document.getElementsByClassName('box')[2]
a.style.display = "none";
b.style.display = "none";