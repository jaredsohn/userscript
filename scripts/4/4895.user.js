// ==UserScript==
// @name          Page Reloader
// @description   Refreshes the page after inactivity
// @include       *
// @exclude
// @namespace     http://maltekraus.de/Firefox/
// ==/UserScript==

(function() {
  const DELAY = 10 * 60 * 1000; // 10 minutes in milliseconds

  var lastaction = (new Date()).getTime();
  setInterval(function check() {
    if(lastaction + DELAY < (new Date()).getTime()) {
      location.reload();
      lastaction = lastaction * 10; // give the browser time to load the page
    }
  }, 30);
  function updateTime() {
    lastaction = (new Date()).getTime();
  }
  document.addEventListener("mousemove", updateTime, true);
  document.addEventListener("mousedown", updateTime, true);
  document.addEventListener("mouseup",     updateTime, true);
  document.addEventListener("keydown",     updateTime, true);
  document.addEventListener("keyup",         updateTime, true);
})();
//pagereloader.user.js