// ==UserScript==
// @name           Gmail Web Clips Scroller
// @namespace      http://pile0nades.wordpress.com/
// @description    Clicks the Next button on the Web Clips every 10 seconds
// @include        https://mail.google.com/mail/*
// ==/UserScript==

var interval = 10; // seconds


setInterval(function() {
  // simulate click on the Add new feed link
  var next = document.getElementById("fbn");
  if(!next) return;
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var c = next.dispatchEvent(evt);
}, interval * 1000);