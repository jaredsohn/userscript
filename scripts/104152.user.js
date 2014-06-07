// ==UserScript==
// @name           KeepAlive
// @namespace      http://varunkumar-n.blogspot.com
// @description    Keeps the IRCTC session alive
// @include        https://www.irctc.co.in/*
// @include        http://www.irctc.co.in/*
// @include        https://irctc.co.in/*
// @include        http://irctc.co.in/*
// ==/UserScript==

setTimeout("var link = document.getElementById('menu0a7f0p0i17lnk');if (link != null)window.location = link.href;", 60 * 1000);