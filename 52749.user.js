// ==UserScript==
// @name          Wegrechner
// @description   Fügt im Versammlungsplatz die Möglichkeit hinzu, die Laufzeiten zwischen beliebigen Dörfern zu ermitteln.
// @include       http://de*.die-staemme.de/game.php?*village=*&screen=place*
// ==/UserScript==

var vistable = document.getElementsByClassName("vis")[0];
if (vistable != null) {
 function ftthejgh (min) {
  var sec=min*60;
  var dispmins = Math.floor(min);
  var dispsecs = Math.round(sec-(dispmins*60));
  return dispmins + ":" + dispsecs;
 }
 vistable.innerHTML += "\n<tr><td id='jhswegzeitrechner'>D1:<input id='xa' size='3'><input id='ya' size='3'><br>D2:<input id='xb' size='3'><input id='yb' size='3'><br><button id='calcDiffButton'>Wegzeit<br>berechnen</button></td></tr>";
 setEventForCDB();
}

function setEventForCDB() {
 document.getElementById("calcDiffButton").addEventListener('click', function(e) {
  var xdiff = document.getElementById("xa").value-document.getElementById("xb").value;
  var ydiff = document.getElementById("ya").value-document.getElementById("yb").value;
  var weg = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
  document.getElementById("jhswegzeitrechner").innerHTML = "Wegzeiten (gerundet):<br>(Minuten:Sekunden)<br><img src='http://de38.die-staemme.de/graphic/unit/unit_spy.png'>: " + ftthejgh(weg*9) + "<br><img src='http://de38.die-staemme.de/graphic/unit/unit_light.png'><img src='http://de38.die-staemme.de/graphic/unit/unit_knight.png'><img src='http://de38.die-staemme.de/graphic/unit/unit_marcher.png'>: " + ftthejgh(weg*10) + "<br><img src='http://de38.die-staemme.de/graphic/unit/unit_heavy.png'>: " + ftthejgh(weg*11) + "<br><img src='http://de38.die-staemme.de/graphic/unit/unit_spear.png'><img src='http://de38.die-staemme.de/graphic/unit/unit_axe.png'><img src='http://de38.die-staemme.de/graphic/unit/unit_archer.png'>: " + ftthejgh(weg*18) + "<br><img src='http://de38.die-staemme.de/graphic/unit/unit_sword.png'>: " + ftthejgh(weg*22) + "<br><img src='http://de38.die-staemme.de/graphic/unit/unit_ram.png'><img src='http://de38.die-staemme.de/graphic/unit/unit_catapult.png'>: " + ftthejgh(weg*30) + "<br><img src='http://de38.die-staemme.de/graphic/unit/unit_snob.png'>:" + ftthejgh(weg*35) + "<br><button id='thejghBackButton'>Zur&uuml;ck</button>";
  document.getElementById("thejghBackButton").addEventListener('click', function(e) {
   document.getElementById("jhswegzeitrechner").innerHTML = "Dorf 1:<input id='xa' size='3'><input id='ya' size='3'><br>Dorf 2:<input id='xb' size='3'><input id='yb' size='3'><br><button id='calcDiffButton'>Wegzeit<br>berechnen</button>";
   setEventForCDB();
  }, true);
 }, true);
}