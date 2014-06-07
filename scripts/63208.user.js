// ==UserScript==
// @name           My ConquerClub
// @namespace      http://moblog.bradleyit.com
// @include        http*://*.conquerclub.com/game.php*
// ==/UserScript==

function yeargh() { // yeargh matey! prepare to be boarded by my javascript!!!
 if (!document.getElementById("yeargh")) {
 
  var tbl = document.getElementById("dashboard");
  var newTR = tbl.insertRow(0);
  newTR.id = 'yeargh';
  var topTR = document.createElement("TR");
  var topTD = document.createElement("TD");
  var topTbl = document.createElement("TABLE");
  var tTR = document.createElement("TR");
  var tTDL = document.getElementById("right_hand_side");
  var tTDR = document.createElement("TD");
  
  tTDL.style.width = "50%";
  tTDR.appendChild(document.getElementById("players"));
  
  tTR.appendChild(tTDL);
  tTR.appendChild(tTDR);
  
  topTbl.appendChild(tTR);
  topTD.appendChild(topTbl);
  newTR.appendChild(topTD);
 }
}

window.addEventListener('load',yeargh,true);