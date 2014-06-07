// ==UserScript==
// @name           tst
// @namespace      test
// @description    Counts active, ended, going etc. games
// @include        http://landgrab.net/landgrab/Home*
// @include        http://www.landgrab.net/landgrab/Home*
// ==/UserScript==

var putHere;
var counter = 0;


InsertButton();

function InsertButton()

{ 
  var oEl = document.getElementById("active_games_column_div1");
  var oI = oEl.firstChild;
  while(oI = oI.nextSibling)
  {
  counter == counter++;
  font: 'arial';
  if (counter == 1) putHere = oI;
  

  }

  putHere.innerHTML += '<table bgcolor="white" border="1">'  + '<left />' + 'Tournaments - Competitions' + '<BR>' + '<a   href="http://spreadsheets.google.com/ccc?key=0Anlu21s9Zo-HdEIxZVZJUWhSQWtXZ2JLdVVtMkp1R2c&hl=en>Emperor Competition</a>';

}



