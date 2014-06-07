// ==UserScript==
// @name        Paypal Anti Timeout
// @namespace   http://hmastuff.com
// @description Prevents timing out
// @include     https://www.paypal.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

var INTERVAL = 5 * 60 * 1000;

setInterval(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', location.href);
  xhr.send();
}, INTERVAL);
