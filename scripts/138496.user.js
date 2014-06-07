// ==UserScript==
// @name          RS Window Cleaner
// @namespace     http://www.xfire.com/profile/frostedfreeze/
// @description   Navigation bar is only visible in the lobby. Elements not pertaining to the Java applet are removed.
// @include       http://world*.runescape.com/*
// @include       https://world*.runescape.com/*
// @include       http://runescape.com/game.ws*
// @include       http://runescape.com/*/game.ws*
// @include       https://runescape.com/game.ws*
// @include       https://runescape.com/*/game.ws*
// @include       http://www.runescape.com/game.ws*
// @include       http://www.runescape.com/*/game.ws*
// @include       https://www.runescape.com/game.ws*
// @include       https://www.runescape.com/*/game.ws*
// ==/UserScript==

window.unsafeWindow || (unsafeWindow = function() {
  var e = document.createElement('p');
  e.setAttribute('onclick', 'return window;');
  return e.onclick();
}());

unsafeWindow.onload = function() {
  window.game = document.getElementById('game');
}

unsafeWindow.loggedout = function() {
  unsafeWindow.memory.loggedinstate = false;
  log(0);
};

unsafeWindow._7 = function() {
  unsafeWindow.memory.loggedinstate = true;
  log(1);
};

unsafeWindow._11 = function() {
  log(2);
};

unsafeWindow._15 = function() {
  log(3);
  if(clean != true) cleanup();
};

unsafeWindow.unzap = function() {};

window.onresize = function() {
  log(4);
  if(lastH != window.innerHeight) format();
};

function format() {
  if(!game) return;
  game.style.marginTop = (h ? '-50px' : '0px');
  game.style.height = window.innerHeight + (h ? 50 : 0);
  lastH = window.innerHeight;
}

var h = false;
var l = false;
var saved = ['x', 'x', 'x'];
var cache = ['xxx', 'xxx'];
var lastH;
var clean = false;

function log(n) {
  cache[0] = cache[1];
  cache[1] = saved.join('');
  //saved.splice(0, 1);
  //saved.push(n);
  for(var i = 0; i < saved.length - 1; i ++) saved[i] = saved[i + 1];
  saved[saved.length - 1] = n;
  var code = saved.join('');
  if(n == 0 || (n == 1 && l == true)) {
    l = false;
    h = false;
    return format();
  }
  else if(code == '122') {
    l = true;
    h = true;
    format();
  }
  else if(code == '233' && cache[0] != '122' && l == true) {
    h = h ? false : true;
    format();
  }
}

function cleanup() {
  var c = game;
  while(c.nodeName != 'BODY') {
    while(c.nextSibling) c.parentNode.removeChild(c.nextSibling);
    while(c.previousSibling) c.parentNode.removeChild(c.previousSibling);
    c = c.parentNode;
  }
  clean = true;
}