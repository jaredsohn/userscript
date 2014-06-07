// ==UserScript==
// @name           dragscroll
// @description    scroll by dragging whitespace
// @include        *
// ==/UserScript==

var dragging = null;
var lastX = 0;
var lastY = 0;
var lastMouseDownTime = null;
var doubleClickInterval = 500;
var minDragInterval = 500;


window.addEventListener('mousedown', function(event) {

  var element = event.target;

  var now = new Date();
  if ((lastMouseDownTime == null || now - lastMouseDownTime > doubleClickInterval)
    && element.nodeName != 'INPUT' 
    && element.nodeName != 'TEXTAREA' 
    && element.nodeName != 'BUTTON' 
    && element.nodeName != 'SELECT') {

    lastMouseDownTime = now;
    event.preventDefault();
  }
  else {

    lastMouseDownTime = now;
    return;
  }

  // find scrollable element 
  while (element.parentNode != document) {

    //var css = document.defaultView.getComputedStyle(element, null);
    if (element.scrollHeight 
        && element.scrollHeight != element.offsetHeight
        && element.scrollWidth != element.offsetWidth) {

      break;
    }
    element = element.parentNode;
  }

  //GM_log(element.nodeName);

  dragging = element;

  lastX = event.clientX;
  lastY = event.clientY;

}, false);

window.addEventListener('mouseup', function(event) {

  dragging = null;

}, false);

window.addEventListener('mousemove', function(event) {

  if (dragging) {


    dragging.scrollLeft += lastX - event.clientX;
    dragging.scrollTop += lastY - event.clientY;

    lastX = event.clientX;
    lastY = event.clientY;
  }
}, false);

window.addEventListener('click', function(event) {

  // lets cancel clicks on links when we are dragging
  if (event.target.nodeName != 'A') {

    return;
  }

  var now = new Date();

  if (now - lastMouseDownTime > minDragInterval) {

    event.preventDefault();
  }

}, false);
