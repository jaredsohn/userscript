// ==UserScript==
// @name           Travian - distance in village overview
// @namespace      http://userscripts.org/users/72477
// @include        http://speed.travian.lt/karte.php?*
// @version        0.01
// ==/UserScript==

var target = document.getElementById("options").getElementsByTagName("tbody")[0];
var Ttr = document.createElement("tr");
var Ttd = document.createElement("td");

var selVil = getSelectedVillage();

xCord = selVil.snapshotItem(0).textContent.replace("(", "");
yCord = selVil.snapshotItem(2).textContent.replace(")", "");

var curD = document.location.href.match(/d=(\d+)&c/)[1];

curD = id2xy(curD);

var xDist = xCord - curD[0];
var yDist = yCord - curD[1];
var distance = Math.sqrt(xDist * xDist + yDist * yDist);
distance = Math.round(distance);


Ttd.innerHTML = "<a href='#'>» Distance from current village: " + distance + "</a>";
Ttr.appendChild(Ttd);
target.appendChild(Ttr);

function getSelectedVillage(){
  var xpath = '//table[@id="vlist"]/tbody/tr[td/@class="dot hl"]/td[@class="aligned_coords"]/div';
  var anch = fastEval(xpath, document);
  var id = anch;
  //var id = anch.href.match(/=(\d+)/)[1];
  return anch;
}

function id2xy(vid) {var arrXY = new Array; var ivid = parseInt(vid); arrXY[0] = (ivid%801?(ivid%801)-401:400); arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; return arrXY;};

function fastEval(xpath, context){
  return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}