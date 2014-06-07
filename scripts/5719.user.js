// Marc Belmont presents : Auto Scroll!
// version 1.6
// 2006-10-09
//
// ------------------------------
//
// Desc: scrolls the page when you move the mouse up and down
// To install, you need Greasemonkey 0.4 or later.
//
// ------------------------------
//
// ==UserScript==
// @name          Auto Scroll
// @namespace     http://www.marcbelmont.com
// @description   Scrolls the page when you move the mouse up and down
// @include       http://*
// ==/UserScript==

//////////////////////
// Constants	    //
//////////////////////

var NOSCROLL = 200; // Area in the middle of the page where there won't be scrolling
var SCROLLSTEP = 5; // Scrolling speed
var ONLYLEFTRIGHT = 1; // Scrolling will happen only when you move left or right in the top or bottom areas. Possible values are 0 | 1
var ONLYLEFTRIGHT_MOUSESPEED = 1.5; // Mouse speed needed to activate the scrolling
var ONLYLEFTRIGHT_DONTSCROLL = 100; // if no event for too long, no scrolling

//////////////////////
// Some Code	    //
//////////////////////

var _mX = 0;
var _mXOld = 0;
var _mYOld = 0;
var _mY = 0;
var _go = 0;
var _mNow = new Date();
var _mThen = new Date();

// 1. Catch mouse movement
document.addEventListener('mousemove', mousemove, true);
function mousemove(e)
{
  // get mouse pos and the date
  if (!e)
    var e = window.event || window.Event;
  if('undefined'!=typeof e.pageX) {
    _mX = e.pageX;
    _mY = e.pageY;
  } else {
    _mX = e.clientX + document.body.scrollLeft;
    _mY = e.clientY + document.body.scrollTop;
  }
  _mNow = Date.now();

  // Hack to avoid unwanted scrolling when the mouse enters a window
  // if no event for too long, no scrolling
  if (_mNow - _mThen > ONLYLEFTRIGHT_DONTSCROLL)
    _go = 0;

  // Scroll the window
  ScrollWindow();

  _mXOld = _mX;
  _mYOld = _mY;
  _mThen = _mNow;
}

// 2. scroll the window
function ScrollWindow() {
  // don't scroll if we're in the middle of the page
  var end = ((_mY - window.pageYOffset) - window.innerHeight/2);
  if (Math.abs(end) < NOSCROLL/2) {
    return;
  }

  // if ONLYLEFTRIGHT is on, scroll only when you move left or right,
  if (ONLYLEFTRIGHT && (Math.abs(_mY - _mYOld) > 2)) {
    return;
  }
  // if you want scrolling, mouse have to go start moving slowly
  if (Math.abs(_mY - _mYOld) < 7 && Math.abs(_mX - _mXOld) < 7)
    _go = 1;


  // scroll the page
  var way = end > 0 ? 1 : -1;
  var val = SCROLLSTEP;
  if (ONLYLEFTRIGHT) {
    if (_go)
      val = Math.pow(Math.abs(_mX - _mXOld), ONLYLEFTRIGHT_MOUSESPEED);
    else {
      val = 0;
    }
  }
  window.scrollTo(window.pageXOffset, window.pageYOffset + val*way);
}


