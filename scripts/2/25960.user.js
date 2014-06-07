// Gmail 2 Minute Timer Script
// version 0.2
// 2008-5-4
// Copyright (c) 2008, Scotty Allen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gmail 2 Minute Timer Script
// @namespace     http://scottyallen.com/download/
// @description   Sets a two minute timer whenever you open a thread or compose a message.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

var gmail = null;
var timer = null;
var TIMER_LENGTH = 120;

window.addEventListener('load', function() {
  if(unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init)
  }
}, true);


function init(g) {
  GM_log("init");
  gmail = g;
  gmail.registerViewChangeCallback(listenForViewWindow);
  listenForViewWindow();
}

function listenForViewWindow() {
  var viewType = gmail.getActiveViewType();
  GM_log(viewType);
  if (viewType == 'co' || viewType == 'cv') {
    installTimer();
  } else {
    removeTimer();
  }
}

function installTimer() {
  removeTimer();
  timer = new Timer();
  timer.install();
}

function removeTimer() {
  if (timer) {
    timer.remove();
  }
}

function Timer() {
}

Timer.prototype.remove = function() {
  GM_log("remove");
  if (this.htmlElement && this.htmlElement.parentNode) {
    GM_log("found timer element - removing");
    this.htmlElement.parentNode.removeChild(this.htmlElement);
    delete this.htmlElement;
  }
  if (this.tickTimerId) {
    window.clearTimeout(this.tickTimerId);
    delete this.tickTimer;
  }
  timer = null;
}

Timer.prototype.getTimeSeconds = function() {
  return Math.floor((new Date().getTime()) / 1000);
}

Timer.prototype.position = function() {
  var canvas_frame = window.parent.document.getElementById('canvas_frame');
  this.htmlElement.style.left = '0px';
  if (canvas_frame.contentWindow.scrollMaxX == 0) {
    this.htmlElement.style.bottom = '0px';
  } else {
    this.htmlElement.style.bottom = '15px';
  }
}

Timer.prototype.install = function() {
  GM_log("Timer.install");
  this.htmlElement = document.createElement('div');
  this.htmlElement.id = 'timer';
  this.htmlElement.style.position = 'fixed';
  this.htmlElement.style.width = '50px';
  this.htmlElement.style.height = '20px';
  this.htmlElement.style.background = 'green';
  this.htmlElement.style.textAlign = 'center';
  this.htmlElement.style.paddingTop = '4px';
  this.htmlElement.style.paddingTop = '2px';
  this.position();

  this.endTime = this.getTimeSeconds() + TIMER_LENGTH;

  this.showTime();

//  gmail.getMastheadElement().style.position = 'relative';
//  gmail.getMastheadElement().appendChild(this.htmlElement);
  window.parent.document.body.appendChild(this.htmlElement);

  var theTimer = this;
  this.tickTimerId = window.setTimeout(function() { theTimer.tick() }, 1000);
}

Timer.prototype.showTime = function() {
  var minutes = this.getMinutes();
  var seconds = this.getSeconds();
  this.htmlElement.innerHTML = minutes + ':' +
      (seconds.toString().length == 1 ?  '0' + seconds : seconds);
}

Timer.prototype.getTotalSecondsLeft = function() {
  return this.endTime - this.getTimeSeconds();
}

Timer.prototype.getSeconds = function() {
  return Math.abs(this.getTotalSecondsLeft()) % 60;
}

Timer.prototype.getMinutes = function() {
  return Math.floor(Math.abs(this.getTotalSecondsLeft()) / 60);
}

Timer.prototype.tick = function() {
  this.position();
  GM_log("tick()");
  if (this.getTotalSecondsLeft() < 0) {
     // timer expired
    this.htmlElement.style.background = 'red';
  }
  this.showTime();
  var theTimer = this;
  this.tickTimerId = window.setTimeout(function() {theTimer.tick()}, 1000);
}
