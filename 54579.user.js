// ==UserScript==
// @name           YourTurn
// @namespace      RaceBot
// @description    Auto-refreshes a page until it's your turn
// @include        http://genie.game-host.org/activelist.htm
// ==/UserScript==

var tds = document.getElementsByTagName('td');
var yourTurn = false;

for (var cnt = 0; cnt < tds.length; cnt++) {
  if (tds[cnt].innerHTML.match('Your turn')) {
    yourTurn = true;
  }
}

if (yourTurn) {
  alert ("It's your turn!");
} else {
  setTimeout("location.reload(true);",5*1000);
}
