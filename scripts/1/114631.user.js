// --------------------------------------------------------------------
// This script is modified version of aeosynth's Scrollbar Anywhere
// http://userscripts.org/scripts/show/50527
// --------------------------------------------------------------------
// ==UserScript==
// @name           Scrollbar Anywhere
// @description    Added momentum-like behavior to aeosynth's Scrollbar Anywhere
// @namespace      rippinblaise
// @include        *
// @version        0.2.1
// ==/UserScript==

//start preferences
var grabndrag = true; //doesn't work very well with non-grabndrag
var button = 1; //0 = left, 1 = middle, 2 = right
//end preferences

var x, y, ratioX, ratioY, start, move, end, contextmenu, shouldPrevent; //aeosynth's
var decelerate, oldx, oldy, velx, vely, dampx = .9, dampy = .9;
start = function (e) {
  if (e.button != button || e.ctrlKey) {
    return;
  }
  shouldPrevent = true;
  x = e.clientX;
  y = e.clientY;
  oldx = x;
  oldy = y;
  if (grabndrag) {
    ratioX = ratioY = -1;
  }
  else if (window.scrollMaxY) {
    ratioX = (window.innerWidth + window.scrollMaxX) / window.innerWidth;
    ratioY = (window.innerHeight + window.scrollMaxY) / window.innerHeight;
  }
  else {  //chrome doesn't support window.scrollMax
    ratioX = document.width / window.innerWidth;
    ratioY = document.height / window.innerHeight;
  }
  window.addEventListener('mousemove', move, true);
  window.addEventListener('mouseup', end, true);
};
move = function (e) {
  window.scrollBy(ratioX * (e.clientX - x), ratioY * (e.clientY - y));
  oldx = x;
  oldy = y;
  x = e.clientX;
  y = e.clientY;
};
end = function (e) {
  window.removeEventListener('mousemove', move, true);
  window.removeEventListener('mouseup', end, true);
  x = e.clientX;
  y = e.clientY;
  velx = x - oldx;
  vely = y - oldy;
  decelerate();
};
decelerate = function () {
  window.scrollBy(ratioX * velx, ratioY * vely);
  velx *= dampx;
  vely *= dampy;
  if(vely < -.01 || vely > .01 || velx < -.01 || velx > .01) 
    setTimeout(decelerate, 20);
};
contextmenu = function (e) {
  //e.ctrlKey is always false here (Firefox 3.6), so we have to use the global var
  if (shouldPrevent) {
    e.preventDefault();
    shouldPrevent = false;
  }
}
window.addEventListener('mousedown', start, true);
if (button == 2)
  window.addEventListener('contextmenu', contextmenu, true);
