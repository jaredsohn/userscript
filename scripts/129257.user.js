// ==UserScript==
// @name          lunaretna's webpage refresher
// @namespace     gm
// @description   Automatically refreshes the webpage after your specified time.
// @include
// ==/UserScript==

var SEC = 1000;
var MIN = 60*1000;
window.setTimeout(
  function () {
    window.location.reload();
  }, 5*MIN
);