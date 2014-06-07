// ==UserScript==
// @name        2048 Autoplay
// @namespace   http://userscripts.org/users/644564
// @include     http://gabrielecirulli.github.io/2048/
// @include     http://andizzle.github.io/2048x2/
// @version     1.0
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

var GO_LEFT = 'left';
var GO_RIGHT = 'right';
var GO_TOP = 'up';
var GO_BOTTOM = 'down';

//holds grid value
var grid = [
  [],
  [],
  [],
  []
];

var gameSpeed = 500;
var gameLoop = null;

//step counts
var stepCount = 0;

if (has_game()) {
  console.log('2048 game exists. Let\'s play!');

  //main game loop
  gameLoop = setInterval(function () {
    if ($('.game-container .game-message.game-over').length) {
      console.log('Full board, We lost. :(');
      clearInterval(gameLoop);
    }

    if (!win_game()) {
      var nextMove = get_next_move();

      if (nextMove) {
        send_move(nextMove);
        stepCount++;
        display_steps();
      } else {
        console.log('No more moves. We lost. :(');
        clearInterval(gameLoop);
      }
    } else {
      console.log('We Won!');
      clearInterval(gameLoop);
    }
  }, gameSpeed);

} else {
  console.log('No 2048 game');
}

/**
 * check if game is won
 *
 * @returns {boolean}
 */
function win_game() {
  populate_grid_values();

  for (var row = 0; row < 4; row++) {
    for (var column = 0; column < 4; column++) {
      if (grid[row][column] == 2046) {
        return true;
      }
    }
  }

  return false;
}

/**
 * determine next move
 *
 * @returns {string}
 */
function get_next_move() {
  var move = '';

//  move = move_closest_smallest();
  move = move_closest_largest();
  move = !move ? move_random() : move;

  return move;
}

/**
 * get grid value
 * grid follows Column by Row format, 1 based index
 */
function populate_grid_values() {
  for (var row = 1; row <= 4; row++) {
    for (var column = 1; column <= 4; column++) {
      var tileNew = $('.tile-position-' + column + '-' + row + '.tile-new');
      var tileMerged = $('.tile-position-' + column + '-' + row + '.tile-merged');
      var tile = $('.tile-position-' + column + '-' + row + ':last');

      if (tileNew.length) {
        grid[row - 1][column - 1] = parseInt(tileNew.text());
      } else if (tileMerged.length) {
        grid[row - 1][column - 1] = parseInt(tileMerged.text());
      } else if (tile.length) {
        grid[row - 1][column - 1] = parseInt(tile.text());
      } else {
        grid[row - 1][column - 1] = 0;
      }
    }
  }
}

/**
 * is there a game?
 *
 * @returns {boolean}
 */
function has_game() {
  return $('.grid-container:first .grid-row').length == 4;
}

/**
 * merge 2 adjacent neighbors of same value
 *
 * @returns {string}
 */
function move_closest_smallest() {
  var move = '';
  var smallest = 99999;
  var smallestRow = -1, smallestColumn = -1;
  var smallestNeighborRow = -1, smallestNeighborColumn = -1;

  //find the smallest value with a neighbor of equal value
  for (var row = 0; row < 4; row++) {
    for (var column = 0; column < 4; column++) {
      if (grid[row][column] == 0) {
        continue;
      }

      //smallest than current smallest number
      if (grid[row][column] < smallest && grid[row][column] > 0) {
        var tempSmallest = grid[row][column];

        //check for neighbors for same value
        //left neighbor
        if (column > 0 && tempSmallest == grid[row][column - 1]) {
          smallest = tempSmallest;
          smallestRow = row;
          smallestColumn = column;
          smallestNeighborRow = row;
          smallestNeighborColumn = column - 1;
        }

        //right neighbor
        if (column < 3 && tempSmallest == grid[row][column + 1]) {
          smallest = tempSmallest;
          smallestRow = row;
          smallestColumn = column;
          smallestNeighborRow = row;
          smallestNeighborColumn = column + 1;
        }

        //top neighbor
        if (row > 0 && tempSmallest == grid[row - 1][column]) {
          smallest = tempSmallest;
          smallestRow = row;
          smallestColumn = column;
          smallestNeighborRow = row - 1;
          smallestNeighborColumn = column;
        }

        //bottom neighbor
        if (row < 3 && tempSmallest == grid[row + 1][column]) {
          smallest = tempSmallest;
          smallestRow = row;
          smallestColumn = column;
          smallestNeighborRow = row + 1;
          smallestNeighborColumn = column;
        }
      }
    }
  }

  if (smallestRow >= 0 && smallestColumn >= 0 &&
    smallestNeighborRow >= 0 && smallestNeighborColumn >= 0) {
    console.log('Found ' + smallest + '[' + smallestRow + ',' + smallestColumn + ']');
    move = smallestRow != smallestNeighborRow ? GO_TOP : GO_LEFT;
  }

  return move;
}

function move_closest_largest() {
  var move = '';
  var largest = -1;
  var largestRow = -1, largestColumn = -1;
  var largestNeighborRow = -1, largestNeighborColumn = -1;

  //find the largest value with a neighbor of equal value
  for (var row = 0; row < 4; row++) {
    for (var column = 0; column < 4; column++) {
      if (grid[row][column] == 0) {
        continue;
      }

      //largest than current largest number
      if (grid[row][column] > largest && grid[row][column] > 0) {
        var tempSmallest = grid[row][column];

        //check for neighbors for same value
        //left neighbor
        if (column > 0 && tempSmallest == grid[row][column - 1]) {
          largest = tempSmallest;
          largestRow = row;
          largestColumn = column;
          largestNeighborRow = row;
          largestNeighborColumn = column - 1;
        }

        //right neighbor
        if (column < 3 && tempSmallest == grid[row][column + 1]) {
          largest = tempSmallest;
          largestRow = row;
          largestColumn = column;
          largestNeighborRow = row;
          largestNeighborColumn = column + 1;
        }

        //top neighbor
        if (row > 0 && tempSmallest == grid[row - 1][column]) {
          largest = tempSmallest;
          largestRow = row;
          largestColumn = column;
          largestNeighborRow = row - 1;
          largestNeighborColumn = column;
        }

        //bottom neighbor
        if (row < 3 && tempSmallest == grid[row + 1][column]) {
          largest = tempSmallest;
          largestRow = row;
          largestColumn = column;
          largestNeighborRow = row + 1;
          largestNeighborColumn = column;
        }
      }
    }
  }

  if (largestRow >= 0 && largestColumn >= 0 &&
    largestNeighborRow >= 0 && largestNeighborColumn >= 0) {
    console.log('Found ' + largest + '[' + largestRow + ',' + largestColumn + ']');
    move = largestRow != largestNeighborRow ? GO_TOP : GO_LEFT;
  }

  return move;
}

/**
 * generates a random move
 *
 * @returns {string}
 */
function move_random() {
  var rand = Math.floor((Math.random() * 4) + 1);
  var move = '';

  switch (rand) {
    case 1:
      move = GO_TOP;
      break;
    case 2:
      move = GO_BOTTOM;
      break;
    case 3:
      move = GO_LEFT;
      break;
    case 4:
      move = GO_RIGHT;
      break;
  }
  console.log('Random move: ' + move);
  return move;
}

function display_steps() {
  var stepWrapper = $('#autoplay_2048_steps');
  if (!stepWrapper.length) {
    stepWrapper = $('<div/>', {'id': 'autoplay_2048_steps'}).appendTo($('body'));
    stepWrapper.css({
      'position': 'fixed',
      'top': 10,
      'left': 10,
      'font-size': '48px'
    });
  }

  stepWrapper.text(stepCount);
}

/**
 * sends a direction key
 *
 * @param move
 */
function send_move(move) {
  switch (move) {
    case GO_LEFT:
      send_key(37);
      break;
    case GO_TOP:
      send_key(38);
      break;
    case GO_RIGHT:
      send_key(39);
      break;
    case GO_BOTTOM:
      send_key(40);
      break;
  }
}

function send_key(key) {
  var keyboardEvent = document.createEvent("KeyboardEvent");
  var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

  keyboardEvent[initMethod](
    "keydown", // event type : keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // viewArg: should be window
    false, // ctrlKeyArg
    false, // altKeyArg
    false, // shiftKeyArg
    false, // metaKeyArg
    key, // keyCodeArg : unsigned long the virtual key code, else 0
    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
  );

  window.document.getElementsByTagName('body')[0].dispatchEvent(keyboardEvent);
}