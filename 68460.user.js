// ==UserScript==
// @name           Travian - get resources of other villages
// @namespace      http://userscripts.org/users/72477
// @description    Gets resource amount of other villages
// @include        http://*.travian.*
// @version        0.03
// ==/UserScript==

var updateClicks = GM_getValue("resUpdateDefault");
var firstRun = false;

function firstRunn() {
firstRun = true;
var askValue = window.prompt("Hello! Please give me refresh rate of 'Travian - get resources of other villages'- script. Eg. if you say 10, i'm going to update resources every 10th time you go to new page in travian. Please give an integer", "20");

if (isNaN(askValue)) {
alert("Integer please");
askIt();
return false;
}
else if (askValue == null || askValue == "") {
alert("Next time then :)");
}
else {
GM_setValue("resUpdateDefault", askValue);
GM_setValue("resUpdateCount", askValue);
firstRun = false;
}

}

if (updateClicks == undefined) {
firstRunn();
}

function AddResAmount() {

var villages = document.getElementById("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");

var villagestext = document.getElementById("vlist").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];

var wholenew = document.createElement("td");
var tillNewRefresh = document.createElement("span");
tillNewRefresh.innerHTML = "Resources in other villages:";

wholenew.appendChild(tillNewRefresh);
villagestext.appendChild(wholenew);

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
  
  if (res == 1) {
  var cropIncome = haha.getAttribute("title");
  var color = "red";
  if (cropIncome >= 0) {
  color = "green";
  cropIncome = "+" + cropIncome;
  }
  }
  
  }
  
  var newTD = document.createElement("td");
  var allhaha;
  allhaha = "<img class='r1' src='img/x.gif'>" + aRes[4];
  allhaha += "<img class='r2' src='img/x.gif'>" + aRes[3];
  allhaha += "<img class='r3' src='img/x.gif'>" + aRes[2];
  allhaha += "<img class='r4' src='img/x.gif'>" + aRes[1] + " <span style='color: " + color + ";'>" + cropIncome + "</span>";
  forCache += allhaha + "|";
  newTD.innerHTML = allhaha;
  villages[vn].appendChild(newTD);
}

GM_setValue("resUpdateCount", updateClicks);
GM_setValue("resUpdateCache", forCache);

}

function updatee() {
GM_setValue("resUpdateCount", "0");
window.location.reload(true);
}

function cacheResAmount() {
var villages = document.getElementById("vlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
var villagestext = document.getElementById("vlist").getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];

var wholenew = document.createElement("td");
var tillNewRefresh = document.createElement("a");
tillNewRefresh.setAttribute("href", "#");
tillNewRefresh.innerHTML = "Refresh now (" + GM_getValue("resUpdateCount") + ")";

var tillNewRefresh2 = document.createElement("a");
tillNewRefresh2.setAttribute("href", "#");
tillNewRefresh2.innerHTML = " Edit rate";

tillNewRefresh.addEventListener("click", updatee, true); 
tillNewRefresh2.addEventListener("click", firstRunn, true); 

wholenew.appendChild(tillNewRefresh);
wholenew.appendChild(tillNewRefresh2);
villagestext.appendChild(wholenew);

var urlBase = location.href.substring(0, location.href.indexOf('/', 14)) + "/";

var forCache = GM_getValue("resUpdateCache").split("|");

for (vn in villages)
{ 
  var newTD = document.createElement("td");
  newTD.innerHTML = forCache[vn];
  villages[vn].appendChild(newTD);
}
}
if (firstRun == false) {

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