// ==UserScript==
// @name           LG Tournaments & Competitions 
// @namespace      LG Tournaments & Competitions
// @description    LG Tournaments & Competitions 
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


  putHere.innerHTML +=  '<table bgcolor="41a03a" text-align="center" width="100%" border="1">'  + '<left />' + '<BR>' + '<a href="http://sites.google.com/site/lgtournaments/" target="_blank">LG Tournaments - Competitions' + '</a>' +   '</BR> <BR>';


}



