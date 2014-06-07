// ==UserScript==
// @name          InstaScroll
// @description   Instantly scrolls to position determined by mousewheel turns.   
// @include       *
// ==/UserScript==
// InstaScroll
// version 2.0
// 2007-09-13
// Copyright (c) 2007, Hans Loeblich
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// Have you ever tried to scroll down a page faster than your browser/computer can handle?  
// You quickly flick the mouse wheel a few times, and when you are done the browser is still
// trying to catch up.  It moves a few lines at a time until it eventually gets where you want it. 
// InstaScroll solves this problem.
// If the browser has fallen behind, InstaScroll causes it to instantly move to the accumulated 
// scroll position, instead of performing multiple moves of a few lines at a time. 

function instaScrollHandler(event) {
  // find first element that is scrollable (not always the window, could be a div or other block element)
  var el = event.target;
  var original = el;
  var body = document.body;
  var elemStyle;
  while (el && !(el == body || (el.nodeType && el.nodeType == 1 && ((elemStyle = getComputedStyle(el,null)).overflow == 'scroll' || ((elemStyle.overflow == 'auto' || el.nodeName == 'TEXTAREA') && el.scrollHeight > el.clientHeight))))) {
    el = el.parentNode;
  }

  if (el) {
    if (typeof el.instaScrollCount == 'undefined') {
      el.instaScrollCount = 0;
      el.instaScrollTotal = 0;
    }
    el.instaScrollCount++;
    el.instaScrollTotal += event.detail * instaScrollHandler.elem.clientHeight;
    event.preventDefault();
    instaScrollHandler.elem.innerHTML = 'Original: ' + original + '  Current: ' + el + '  Scroll: ' + el.scrollHeight + '  Client: ' + el.clientHeight;
    if (el == document.body) { // code for scrolling the window (or frame)
      if (el.instaScrollTotal - (window.scrollMaxY - window.scrollY) >= 0) { // scrolled past the bottom
        window.scrollBy(0, window.scrollMaxY - window.scrollY);
        el.instaScrollCount = 0;
        el.instaScrollTotal = 0;
      } else if (el.instaScrollTotal + window.scrollY < 0) { // scrolled past the top                	
        window.scrollBy(0, -window.scrollY);               
        el.instaScrollCount = 0;
        el.instaScrollTotal = 0;
      } else {
        setTimeout(function() {
          if (el.instaScrollCount > 0) {
            el.instaScrollCount--;
            if (el.instaScrollCount === 0) {
              window.scrollBy(0,el.instaScrollTotal);
              el.instaScrollTotal = 0;
            }
          }
        },0);
      }
    } else { // code for scrolling some other element 
      el.scrollMaxY = el.scrollHeight - el.clientHeight; 
      if (el.instaScrollTotal - (el.scrollMaxY - el.scrollTop) >= 0) { // scrolled past the bottom
        el.scrollTop = el.scrollMaxY;
        el.instaScrollCount = 0;
        el.instaScrollTotal = 0;
      } else if (el.instaScrollTotal + el.scrollTop < 0) { // scrolled past the top                	
        el.scrollTop = 0;               
        el.instaScrollCount = 0;
        el.instaScrollTotal = 0;
      } else { // otherwise, queue the event to be processed  
        setTimeout(function() {
          if (el.instaScrollCount > 0) {
            el.instaScrollCount--;
            if (el.instaScrollCount === 0) {
              el.scrollTop += el.instaScrollTotal;
              el.instaScrollTotal = 0;
            }
          }
        },0);
      }
    }
  }
}

function instaScrollInit() {
  // use elem to try to determine the height of a default scrolling "line" 
  var elem = document.createElement('div');
  elem.appendChild(document.createTextNode('.'));
  elem.style.position = 'absolute';
  elem.style.top = '-100px';
  document.body.appendChild(elem);
  instaScrollHandler.elem = elem;
}

instaScrollInit();
window.addEventListener("DOMMouseScroll", instaScrollHandler, false);
