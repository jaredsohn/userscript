// ==UserScript==
// @name           Hide reserved games
// @namespace      joojamoi
// @include        http://genie.game-host.org/openlist.htm
// ==/UserScript==

var gameList = document.getElementsByTagName('table')[1];

var rows = gameList.rows;

if (rows[0].cells[4].innerHTML == 'Comment') {
  for (var row = rows.length - 1; row >= 1; --row) {
    var comment = rows[row].cells[4].innerHTML;
    if (comment.toLowerCase().indexOf('reserved') >= 0) {
      gameList.deleteRow(row);
    }
  }
} else {

  alert('The script to hide reserved games is broken.');

}
