// ==UserScript==
// @name           Scrollbar Anywhere
// @description    Use the scrollbar from anywhere on the page, or grab-n-drag.
// @namespace      aeosynth
// @include        *
// @version        0.2.0
// @copyright      2009, 2010, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
// ==/UserScript==

//start preferences
var grabndrag = false;
var button = 1;//0 = left, 1 = middle, 2 = right
//end preferences

var x, y, ratioX, ratioY, start, move, end, contextmenu, shouldPrevent;
start = function (e) {
  if (e.button != button || e.ctrlKey) {
    return;
  }
  shouldPrevent = true;
  x = e.clientX;
  y = e.clientY;
  if (grabndrag) {
    ratioX = ratioY = -1;
  } else if (window.scrollMaxY) {
    ratioX = (window.innerWidth + window.scrollMaxX) / window.innerWidth;
    ratioY = (window.innerHeight + window.scrollMaxY) / window.innerHeight;
  } else {//chrome doesn't support window.scrollMax
    ratioX = document.width / window.innerWidth;
    ratioY = document.height / window.innerHeight;
  }
  window.addEventListener('mousemove', move, true);
  window.addEventListener('mouseup', end, true);
};
move = function (e) {
  window.scrollBy(ratioX * (e.clientX - x), ratioY * (e.clientY - y));
  x = e.clientX;
  y = e.clientY;
};
end = function () {
  window.removeEventListener('mousemove', move, true);
  window.removeEventListener('mouseup', end, true);
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
