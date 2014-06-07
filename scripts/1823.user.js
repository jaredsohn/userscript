// Web Sudoku Arrow Keys
// version 1
// 2005-09-25
// Copyright 2005 Jason Diamond
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need to be
// using Firefox with the Greasemonkey extension.
//
// Visit http://greasemonkey.mozdev.org/ to install Greasemonkey.
// Then restart Firefox and revisit this script.  Under Tools, there
// will be a new menu item to "Install User Script".  Accept the
// default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select "Web Sudoku
// Arrow Keys", and click Uninstall.
//
// This script lets you use your arrow keys to navigate between the
// different inputs in a Web Sudoku puzzle.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Web Sudoku Arrow Keys
// @namespace     http://jason.diamond.name/userscripts
// @description   use your arrow keys instead of your mouse on Web Sudoku
// @include       http://play.websudoku.com/*
// ==/UserScript==

function moveFocus(currentInput, columnDelta, rowDelta) {
  var currentId = currentInput.id;
  var column = parseInt(currentId.charAt(1));
  var row = parseInt(currentId.charAt(2));
  column += columnDelta;
  row += rowDelta;
  if (column >= 0 && column <= 9 &&
      row >= 0 && row <= 9) {
    var newInput = document.getElementById('f' + column + row);
    if (newInput) {
      if (newInput.className == 's0') {
        moveFocus(newInput, columnDelta, rowDelta);
      } else if (newInput.className == 'd0') {
        newInput.focus();
      }
    }
  }
}

function onKeyPress(event) {
  var target = event.target;
  var keyCode = event.keyCode;
  if (keyCode >= 37 && keyCode <= 40) {
    switch (keyCode) {
      case 37: // left
        moveFocus(target, -1, 0);
        break;
      case 38: // up
        moveFocus(target, 0, -1);
        break;
      case 39: // right
        moveFocus(target, 1, 0);
        break;
      case 40: // down
        moveFocus(target, 0, 1);
        break;
    }
    event.preventDefault();
  }
}

var inputs = document.getElementsByTagName('INPUT');
for (var i = 0; i < inputs.length; ++i) {
  var input = inputs[i];
  if (input.className == 'd0') {
    input.addEventListener('keypress', onKeyPress, true);
  }
}

