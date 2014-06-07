// Google Reader Mousewheel Always Marks As Read 1.0

// ==UserScript==
// @name          Google Reader Mousewheel Always Marks As Read
// @namespace     http://www.massless.org/
// @description   Always marks items as read when scrolling over the queue with the mousewheel in Google Reader.
// @include       http://www.google.com/reader*
// ==/UserScript==

/**
 * Script modified and improved greatly by Mihai Parparita.
 */
 
var mouseOverQueue = false;

var q = document.getElementById('queue-container');
q.addEventListener('mouseout', function() {mouseOverQueue = false;}, false);
q.addEventListener('mouseover', function() {mouseOverQueue = true;}, false);

function onDomMouseScroll(e) {
  if (!mouseOverQueue) {
    return;
  }
  
  var fakeEvent = {};
  fakeEvent.charCode = 13;
  unsafeWindow.document.onkeypress(fakeEvent);
}

setTimeout(function() {
  unsafeWindow.addEventListener('DOMMouseScroll', onDomMouseScroll, false);}, 
  1000);

