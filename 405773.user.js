// ==UserScript==
// @name        mmmm--let-me-work-while-it-scrolls
// @namespace   http://userscripts.org/users/75517/scripts
// @description add smooth auto scrolling on the page, SPACE to toggle between play/pause
// @include     http://bonjourtoutes.fr/
// @include     http://lesaintdesseins.fr/
// @version     0.4
// @grant       none
// ==/UserScript==

function startscroll() {
  var scrollStep = 1;
  var scrollInterval = 100;
  document.autoscrollstarted = true;
  document.scrotum = window.setInterval( function() {
    window.scroll(0, window.pageYOffset + scrollStep);
  }, scrollInterval);
}

function stopscroll() {
  document.autoscrollstarted = false;
  window.clearInterval(document.scrotum); 
}

function togglescroll(evt) {
  // 32 <-> space
  if (32 == evt.keyCode) {
    // space usually scroll down half the page, cancel that
    evt.preventDefault();
    if (document.autoscrollstarted) {
      stopscroll();
    } else {
      startscroll();
    }
  }
}

function myinit() {
  window.setTimeout(startscroll, 100);
  window.addEventListener('keydown', togglescroll, false);
}

window.addEventListener('DOMContentLoaded', myinit, false);
