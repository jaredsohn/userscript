// ==UserScript==
// @name           Travian - get resources of other villages
// @namespace      http://userscripts.org/users/72477
// @description    Gets resource amount of other villages
// @include        http://*.travian.*
// ==/UserScript==

var updateClicks = 20;

function AddResAmount() {

var villages = document.getElementById("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
var urlBase = location.href.substring(0, location.href.indexOf('/', 14)) + "/";

var forCache = "";

for (vn in villages)
{ 
  var getTds = villages[vn].getElementsByTagName("td");
  var getIt = getTds[1].getElementsByTagName("a")[0].getAttribute("href");
  getA = getIt;
  
  var test = GET(getA);
  var temp = document.createElement("span");
  temp.innerHTML = test;
  
  var aRes = new Array();
  
  for (var res = 4; res > 0; res--) {
  
  var haha = fastEval('//td[@id="l' + res + '"]', temp).snapshotItem(0);
  
  aRes[res] = haha.innerHTML;
  
  }
  
  var newTD = document.createElement("td");
  var allhaha;
  allhaha = "<img class='r1' src='img/x.gif'>" + aRes[4];
  allhaha += "<img class='r2' src='img/x.gif'>" + aRes[3];
  allhaha += "<img class='r3' src='img/x.gif'>" + aRes[2];
  allhaha += "<img class='r4' src='img/x.gif'>" + aRes[1];
  forCache += allhaha + "|";
  newTD.innerHTML = allhaha;
  villages[vn].appendChild(newTD);
}

GM_setValue("resUpdateCount", updateClicks);
GM_setValue("resUpdateCache", forCache);

}
function cacheResAmount() {
var villages = document.getElementById("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
var urlBase = location.href.substring(0, location.href.indexOf('/', 14)) + "/";

var forCache = GM_getValue("resUpdateCache").split("|");

for (vn in villages)
{ 
  var newTD = document.createElement("td");
  newTD.innerHTML = forCache[vn];
  villages[vn].appendChild(newTD);
}
}
var val = GM_getValue("resUpdateCount");
if (val != undefined) {
if (val == "0") {
AddResAmount();
}
else {
GM_setValue("resUpdateCount", val - 1);
cacheResAmount();
}
}
else {
AddResAmount();
}

function GET(url){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send("");
  respText=xhttp.responseText;
  return respText;
}

function fastEval(xpath, context){
  return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}