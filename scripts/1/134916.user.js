// ==UserScript==
// @name        Cellblock Make Mover
// @namespace   http://4chan.org/neoquest
// @description Clicks the "Make Move" button for you when you click on a cell.
// @include     http://www.neopets.com/games/cellblock/cellblock_main.phtml
// @version     1
// ==/UserScript==

var gridClick = unsafeWindow.GridClick;

function makeMove(grid, x, y) {
  gridClick(grid, x, y);
  window.setTimeout(function() {
    unsafeWindow.GridCheck();
  }, 500 + (500 * Math.random()));
};

unsafeWindow.GridClick = makeMove;
