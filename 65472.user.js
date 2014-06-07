// ==UserScript==
// @name          Scroll Undo
// @namespace     http://jeffpalm.com/scrollundo/
// @description   Keeps a history of your scroll positions and lets you 'undo' or 'redo' scroll positions
// @include       *
// ==/UserScript==

const NUM_SCROLLS_TO_SKIP = 10;

var history = [];
var placeInHistory = 0;
var scrollCounter = 0; // Only save every NUM_SCROLLS_TO_SKIP

function Point(x,y) {
  var _x = x;
  var _y = y;
  return { x:_x, y:_y, toString: function() {return _x + "," + _y;} };
}

function updateScrollHistory(e,force) {
  if (!force && ++scrollCounter != NUM_SCROLLS_TO_SKIP) {
    return;
  }
  scrollCounter = 0;
  var x = window.pageXOffset;
  var y = window.pageYOffset;
  history[placeInHistory++] = new Point(x,y);
}

function moveInHistory(dx) {
  var i = placeInHistory + dx;
  if (i < 0 || i >= history.length) {
    return;
  }
  placeInHistory += dx;
  var p = history[placeInHistory];
  window.scrollTo(p.x,p.y);
}

function keyPress(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 38) {
      moveInHistory(-1);
    } else if (e.keyCode == 40) {
      moveInHistory(1);
    }
  }
}

function main() {
  window.addEventListener('scroll',updateScrollHistory,true);
  window.addEventListener('keydown',keyPress,true);
  updateScrollHistory(true);
}

main();