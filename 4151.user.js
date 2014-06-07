// ==UserScript==
// @name          Go Home
// @include       *
// @description   Loads the homepage after 10 minutes of inactivity
// @exclude
// ==/UserScript==

const DELAY = 10 * 60 * 1000; // 10 minutes

var lastaction = (new Date()).getTime();
setInterval(function check() {
  if(lastaction + DELAY < (new Date()).getTime()) {
    window.home();
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