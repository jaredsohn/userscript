// ==UserScript==
// @name       Adyen Anti-Timeout
// @namespace  http://hmastuff.com
// @version    0.1
// @description   Prevents timing out
// @include    https://ca-live.adyen.com*
// @license    MIT License
// ==/UserScript==

var INTERVAL = 5 * 60 * 1000;

setInterval(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', location.href);
  xhr.send();
}, INTERVAL);