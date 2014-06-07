// ==UserScript==
// @name           CIA
// @namespace      C3isCool
// @description    Version 1.00
// @include        http://*.astroempires.com/*
// @exclude        http://forum.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// @exclude        http://wiki.astroempires.com/*
// @exclude        http://support.astroempires.com/*
// @exclude        http://*.astroempires.com/
// ==/UserScript==

//images save on image shack
// cross http://img199.imageshack.us/i/crosso.gif/
// hue http://img18.imageshack.us/i/34045605.png/
// int http://img6.imageshack.us/i/88100670.png/
// arrow http://img10.imageshack.us/i/arroweb.gif/

//---Variables---
var sever = document.getElementById('account').nextSibling.innerHTML.charAt(0);
var displayWidth = document.getElementById('bookmarks').parentNode.parentNode.parentNode.width;
var timeStamp = { element: document.body.firstChild.lastChild, date: new Date() };
var tick = 0;
var features = [];
var options = [];
var dump = new Object();

methodLibrary();

