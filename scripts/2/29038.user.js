//
// ==UserScript==
// @name          Conquer Club Map Movement
// @namespace     http://userscripts.org/
// @description   Script to work out Games started
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var version = "1.3.2";
var latestVersion = 0;
var features=[];
var maps = [];
var counter = 0;
var unique = [];
var totals;
var total = 0;
var medals = 1;
var viewer = null;
var gameReq = [];
var mapReq = [];
var current=-1;
var suggtot = 0;
var sTotal = 0;
var sRank;
var sLen = 0;
var class0 = new Classification('#fff','Unclassified',0);
var class1 = new Classification('#f69','Continental',1);
var class2 = new Classification('#fc6','Country',2);
var class3 = new Classification('#ff9','Regional',3);
var class4 = new Classification('#ccf','City',4);
var class5 = new Classification('#9ff','Empirical',5);
var class6 = new Classification('#3cf','Historical Battle',6);
var class7 = new Classification('#969','WWI',7);
var class8 = new Classification('#999','WWII',8);
var class9 = new Classification('#ff0','Fantasy',9);
var class10 = new Classification('#0c0','Game Oriented',10);
var class11 = new Classification('#0ff','Government',11);
var class12 = new Classification('#c09','Sci-Fi',12);
var classification = new Array();
classification['Classic'] = class1;
classification['Doodle Earth'] = class1;
classification['Arms Race!'] = class1;
classification['World 2.1'] = class1;
classification['Europe'] = class1;
classification['Africa'] = class1;
classification['Asia'] = class1;
classification['North America'] = class1;
classification['South America'] = class1;
classification['Rail Europe'] = class1;
classification['High Seas'] = class1;
classification['British Isles'] = class2;
classification['USA'] = class2;
classification['Australia'] = class2;
classification['Canada'] = class2;
classification['Portugal'] = class2;
classification['France'] = class2;
classification['Ireland'] = class2;
classification['Italy'] = class2;
classification['Malta'] = class2;
classification['Battle For Iraq!'] = class2;
classification['Scotland'] = class2;
classification['Greater China'] = class2;
classification['Germany'] = class2;
classification['Netherlands'] = class2;
classification['Brazil'] = class2;
classification['Soviet Union'] = class2;
classification['Rail USA'] = class2;
classification['Hong Kong'] = class2;
classification['Philippines'] = class2;
classification['Luxembourg'] = class2;
classification['Iceland'] = class2;
classification['Iberia'] = class3;
classification['Middle East'] = class3;
classification['Texan Wars'] = class3;
classification['BeNeLux'] = class3;
classification['Great Lakes'] = class3;
classification['Arctic'] = class3;
classification['Cairns Coral Coast'] = class3;
classification['Indochina'] = class3;
classification['Caribbean Islands'] = class3;
classification['Dust Bowl'] = class3;
classification['Puget Sound'] = class3;
classification['Egypt: Valley Of The Kings'] = class3;
classification['Treasures of Galapagos'] = class3;
classification['San Francisco'] = class4;
classification['NYC'] = class4;
classification['Berlin 1961'] = class4;
classification['Montreal'] = class4;
classification['Prohibition Chicago'] = class4;
classification['Sydney Metro'] = class4;
classification["Alexander's Empire"] = class5;
classification['Ancient Greece'] = class5;
classification['Mongol Empire'] = class5;
classification['Egypt: Upper'] = class5;
classification['Egypt: Lower'] = class5;
classification['American Civil War'] = class6;
classification['Waterloo'] = class6;
classification['Battle Of Actium'] = class6;
classification['WWII Western Front'] = class8;
classification['Pearl Harbor'] = class8;
classification['D-Day: Omaha Beach!'] = class8;
classification['WWII Eastern Front'] = class8;
classification['WWII Ardennes'] = class8;
classification['WWII Gazala'] = class8;
classification['WWII Iwo Jima'] = class8;
classification['Bamboo Jack'] = class8;
classification['WWII Australia'] = class8;
classification['Feudal War'] = class9;
classification['New World'] = class9;
classification['Age Of Realms 1'] = class9;
classification['Age Of Realms 2'] = class9;
classification['Age Of Realms 3'] = class9;
classification['Middle Earth'] = class9;
classification['Siege!'] = class9;
classification['King Of The Mountains'] = class9;
classification['Circus Maximus'] = class9;
classification['Age Of Merchants'] = class9;
classification['Duck And Cover'] = class9;
classification['CCU'] = class9;
classification['Tamriel'] = class9;
classification['8 Thoughts'] = class9;
classification['USApocalypse'] = class9;
classification['Discworld'] = class9;
classification['Madness'] = class9;
classification['Extreme Global Warming'] = class9;
classification['Midkemdil'] = class9;
classification['Das Schloss'] = class9;
classification['Chinese Checkers'] = class10;
classification['Conquer Man'] = class10;
classification['Crossword'] = class10;
classification['Draknor - Level 1'] = class10;
classification['U.S. Senate'] = class11;
classification['Space'] = class12;
classification['Solar System'] = class12;

function Classification(bgColor,name,num) {
this.bgColor = bgColor;
this.name = name;
this.num = num;
}

function Totals() {
this._games = 0;
this._sorted = new Array();
this._counter = 0;
this._totals = new Object();
}

function endGame() {
  var tr = viewer.document.getElementById('summary');
  if(sLen == 0)
  tr.innerHTML = "<td><b>Totals</b></td><td>" + totals._games + "</td><td>N/A</td><td>N/A</td>";
  else
  tr.innerHTML = "<td><b>Totals</b></td><td>" + sTotal + "</td><td>" + totals._games + "</td><td>" + (totals._games - sTotal) + "</td><td>N/A</td><td>N/A</td>";
  total = 0;
  viewer.document.getElementById('smap').className = "sorton";
  viewer.document.getElementById('scat').className = "sorton";
  viewer.document.getElementById('scla').className = "sorton";
  viewer.document.getElementById('closeRank').style.opacity = "0.9";
  viewer.document.getElementById('closeRank').style.backgroundColor = "green";
  viewer.document.getElementById('saveRank').style.opacity = "0.9";
  viewer.document.getElementById('saveRank').style.backgroundColor = "green";
}

function saveRank() {
  GM_setValue('savedRank', uneval(totals._totals));
  var date = new Date();
  alert("Saved" + date);
}

function cleanup() {
  for(var jx in mapReq) {
    mapReq[jx].onreadystatechange = function() {};
    mapReq[jx].abort();
  }
  mapReq = [];
  if(viewer != null)
    viewer.close();
}

function alpha(cells, sorter) {
  return cells[sorter].innerHTML;
}

function numerical(cells, sorter) {
  return parseInt(cells[sorter].innerHTML);
}

function sortedTable(cellfn, cell, dir) {
  var res = getElementsByClassName(viewer.document.getElementById('ranktable'),'tr','result',true);
  table = viewer.document.createElement("table");
  for(var r=0; r< 4; r++) {
    var clone = viewer.document.getElementById('ranktable').getElementsByTagName('tr')[r].cloneNode(true);
    table.appendChild(clone);
  }
  var unsorted = new Array();
  var clone = new Array();
  var ref = new Array();
  for(var r=0; r< res.length; r++) {
   var ix = res[r].getElementsByTagName('td');
   ref[r] = cellfn(ix, cell);
   unsorted.push(ref[r]);
   if(isNaN(ref[r]))
   unsorted.sort();
   else
   unsorted.sort(function(a,b) {return(b-a);});
   if(dir == "sortoff") unsorted.reverse();
   clone[r] = res[r].cloneNode(true);
   table.insertBefore(clone[r], table.getElementsByTagName('tr')[unsorted.indexOf(ref[r]) + 4]);
  }
  viewer.document.getElementById('rankBox').removeChild(viewer.document.getElementById('ranktable'));
  table.id = "ranktable";
  table.border=1;
  table.align = "center";
  viewer.document.getElementById('rankBox').appendChild(table);
  viewer.document.getElementById('smap').addEventListener('click', function() {
    if(this.className != "") {
      var scat = viewer.document.getElementById('scat').className;
      var scla = viewer.document.getElementById('scla').className;
      sortedTable(alpha, 0, viewer.document.getElementById('smap').className);
      viewer.document.getElementById('smap').className = (this.className == "sorton" ? "sortoff" : "sorton");
      viewer.document.getElementById('scat').className = scat;
      viewer.document.getElementById('scla').className = scla;
    }
  }
  , false);
  viewer.document.getElementById('scat').addEventListener('click', function() {
    if(this.className != "") {
      var smap = viewer.document.getElementById('smap').className;
      var scla = viewer.document.getElementById('scla').className;
      if(sLen == 0)
      sortedTable(numerical, 2, viewer.document.getElementById('scat').className);
      else
      sortedTable(numerical, 4, viewer.document.getElementById('scat').className);
      viewer.document.getElementById('scat').className = (this.className == "sorton" ? "sortoff" : "sorton");
      viewer.document.getElementById('smap').className = smap;
      viewer.document.getElementById('scla').className = scla;
    }
  }
  , false);
  viewer.document.getElementById('scla').addEventListener('click', function() {
    if(this.className != "") {
      var smap = viewer.document.getElementById('smap').className;
      var scat = viewer.document.getElementById('scat').className;
      if(sLen == 0)
      sortedTable(alpha, 3, viewer.document.getElementById('scla').className);
      else
      sortedTable(alpha, 5, viewer.document.getElementById('scla').className);
      viewer.document.getElementById('scla').className = (this.className == "sorton" ? "sortoff" : "sorton");
      viewer.document.getElementById('smap').className = smap;
      viewer.document.getElementById('scat').className = scat;
    }
  }
  , false);
}

function createBox(txt, name, options) {
  cleanup();
  viewer = window.open('','box','width=800,height=470,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  viewer.addEventListener('unload', function() {
    viewer=null;
    cleanup();
    }, false);
  var style = viewer.document.getElementsByTagName('head')[0].appendChild(viewer.document.createElement("style"));
  style.type = 'text/css';
  style.innerHTML = "#rankDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;} ";
  style.innerHTML += "#rankBox {position:relative;min-width:800px;height:100%;margin-top:10px;border:2px solid #000;background-color:#F2F5F6;} ";
  style.innerHTML += "#rankDiv > #rankBox {position:fixed;overflow:auto;} #ranktable{margin-bottom:20px;;align:center;width:94%;padding:0px;border:1px solid black;text-align:center;font: 7pt Verdana, Arial, Helvetica, sans-serif;} ";
  style.innerHTML += "#rankBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;} ";
  style.innerHTML += "#rankBox p {font:0.7em verdana,arial;padding-left:50px;width:700px;} #ranktable td {width:120px;vertical-align: middle;} .result {font-weight:bold;color:#00f;height:20px} .totals {color:#000;} ";
  style.innerHTML += "#rankBox a {display:inline;position:relative;border:1px solid #000;width:100px;font: verdana,arial;text-transform:uppercase;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox a:hover,#rankBox #closeRank:hover {background-color:#889988;;color:#fff} #header {background-color:#cdc;font-weight:bold;} ";
  style.innerHTML += "#rankBox #closeRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox #saveRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox img {position:relative;top:20px;left:20px;} .rankoptions {width:100px;} .bmedal {font-weight:bold;color:#8C7853} .smedal {font-weight:bold;color:silver} .gmedal {font-weight:bold;color:gold} ";
  style.innerHTML += ".sorton,.sortoff {background-color:cyan;cursor:pointer;}";
  mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
  mObj.id = "rankDiv";
  mObj.style.visibility = 'hidden';
  mObj.style.height = viewer.document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(viewer.document.createElement("div"));
  alertObj.id = "rankBox";
  alertObj.style.left = (viewer.document.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  h1 = alertObj.appendChild(viewer.document.createElement("h1"));
  h1.appendChild(viewer.document.createTextNode("MAP RANK"));
  msg = alertObj.appendChild(viewer.document.createElement("p"));
  msg.id = "progress";
  msg.innerHTML = txt;
  btn = alertObj.appendChild(viewer.document.createElement("a"));
  btn.id = "closeRank";
  btn.appendChild(viewer.document.createTextNode("OK"));
  btn.href = "javascript:void(0);";
  btn.style.opacity = "0.5";
  btn.addEventListener("click" , function () {
    if(btn.style.backgroundColor == "green")
    removeBox();
  }, true);
  save = alertObj.appendChild(viewer.document.createElement("a"));
  save.id = "saveRank";
  save.appendChild(viewer.document.createTextNode("SAVE"));
  save.href = "javascript:void(0);";
  save.style.opacity = "0.5";
  save.addEventListener("click" , function () {
    if(save.style.backgroundColor == "green")
    saveRank();
  }, true);
  table = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("table"));
  table.id = "ranktable";
  table.border=1;
  table.align = "center";
  heading = table.appendChild(viewer.document.createElement("tr"));
  opt = table.appendChild(viewer.document.createElement("tr"));
  cols = table.appendChild(viewer.document.createElement("tr"));
  tots = table.appendChild(viewer.document.createElement("tr"));
  tots.id = "summary";
  tots.className = "result totals";
  if(sLen == 0) {
   cols.innerHTML = "<td id=smap><b>Map</b></td><td>Games</td><td id=scat>Category<td id=scla>Classification</td>";
   tots.innerHTML = "<td><b>Totals</b></td><td>&nbsp;</td><td>N/A</td><td>N/A</td>";
  }
  else{
   cols.innerHTML = "<td id=smap><b>Map</b></td><td>Last</td><td>Games</td><td>Difference</td><td id=scat>Category<td id=scla>Classification</td>";
   tots.innerHTML = "<td><b>Totals</b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>N/A</td><td>N/A</td>";
  }
  viewer.document.getElementById('smap').addEventListener('click', function() {
    if(this.className != "") {
      var scat = viewer.document.getElementById('scat').className;
      var scla = viewer.document.getElementById('scla').className;
      sortedTable(alpha, 0);
      viewer.document.getElementById('smap').className = (this.className == "sorton" ? "sortoff" : "sorton");
      viewer.document.getElementById('scat').className = scat;
      viewer.document.getElementById('scla').className = scla;
    }
  }
  , false);
  viewer.document.getElementById('scat').addEventListener('click', function() {
    if(this.className != "") {
      var smap = viewer.document.getElementById('smap').className;
      var scla = viewer.document.getElementById('scla').className;
      if(sLen == 0)
      sortedTable(numerical, 2);
      else
      sortedTable(numerical, 4);
      viewer.document.getElementById('scat').className = (this.className == "sorton" ? "sortoff" : "sorton");
      viewer.document.getElementById('smap').className = smap;
      viewer.document.getElementById('scla').className = scla;
    }
  }
  , false);
  viewer.document.getElementById('scla').addEventListener('click', function() {
    if(this.className != "") {
      var smap = viewer.document.getElementById('smap').className;
      var scat = viewer.document.getElementById('scat').className;
      if(sLen == 0)
      sortedTable(alpha, 3);
      else
      sortedTable(alpha, 5);
      viewer.document.getElementById('scla').className = (this.className == "sorton" ? "sortoff" : "sorton");
      viewer.document.getElementById('smap').className = smap;
      viewer.document.getElementById('scat').className = scat;
    }
  }
  , false);
  mObj.style.visibility = 'visible';
}

function removeBox() {
  viewer.close();
  viewer = null;
  mapReq = [];
  gameReq = [];
}

function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if (exact)
   {
    if(oElement.className==strClassName){
    arrReturnElements.push(oElement);
    }
   }
   else
   {
    if(oElement.className.has(strClassName)){
     arrReturnElements.push(oElement);
    }
   }
  }
  return (arrReturnElements)
}

function getStatsPage(url,maptype) {
    var mapname = maps[maptype];
    var jump = url;
    mapReq[mapname] = new XMLHttpRequest();
    mapReq[mapname].open('GET', jump, true);
    mapReq[mapname].onreadystatechange = function() {
    if (mapReq[mapname].readyState == 4) {
      if (mapReq[mapname].status == 200){
      var div=document.createElement('div');
      div.innerHTML = mapReq[mapname].responseText;
      var results = getElementsByClassName(div,'span','search_results',true);
      viewer.document.getElementById('progress').innerHTML = "Scanning " + mapname;
      if(results.length && results[0].innerHTML.match(/(\d+) results on (\d+) pages/)) {
        var numGames = parseInt(RegExp.$1);
        totals._games+= numGames;
        var tr = viewer.document.createElement('tr');
        totals._sorted.push(mapname);
        totals._sorted.sort();
        viewer.document.getElementById('ranktable').insertBefore(tr,viewer.document.getElementById('ranktable').getElementsByTagName('tr')[totals._sorted.indexOf(mapname) + 4]);
        tr.className = "result";
        tr.style.backgroundColor = classification[mapname].bgColor;
        if(sLen == 0)
        tr.innerHTML = "<td>" + mapname + "</td><td>" + numGames + "</td><td>" + classification[mapname].num + "</td><td>" + classification[mapname].name + "</td>";
        else
        tr.innerHTML = "<td>" + mapname + "</td><td>" + sRank[maps[maptype]] + "</td><td>" + numGames + "</td><td>" + (numGames - sRank[maps[maptype]]) + "</td><td>" + classification[mapname].num + "</td><td>" + classification[mapname].name + "</td>";
        var tr = viewer.document.getElementById('summary');
        if(sLen == 0)
        tr.innerHTML = "<td><b>Totals</b></td><td>" + totals._games + "</td><td>N/A</td><td>N/A</td>";
        else
        tr.innerHTML = "<td><b>Totals</b></td><td>" + sTotal + "</td><td>" + totals._games + "</td><td>" + (totals._games - sTotal) + "</td><td>N/A</td><td>N/A</td>";
        totals._totals[maps[maptype]] = numGames;
        totals._counter++;
        if(totals._counter == total) {
          endGame();
        }
      }
      else {
       var tr = viewer.document.getElementById('summary');
       if(sLen == 0)
       tr.innerHTML = "<td><b>Totals</b></td><td>" + totals._games + "</td><td>N/A</td><td>N/A</td>";
       else
       tr.innerHTML = "<td><b>Totals</b></td><td>" + sTotal + "</td><td>" + totals._games + "</td><td>" + (totals._games - sTotal) + "</td><td>N/A</td><td>N/A</td>";
       totals._counter++;
       totals._totals[maps[maptype]] = 0;
       if(totals._counter == total) {
         endGame();
       }
      }
      }
      else{
        alert("Could not get " + mapname + " games, error code:  " + mapReq[mapname].status);
      }
    }
    }
    mapReq[mapname].send(null);
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fileden.com/files/2008/5/8/1902058/maprank.txt?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      features = responseDetails.responseText.split('\n');
      var latest = features[0].split('.');
      var ver = version.split('.');
//      latestVersion = (((parseInt(latest[0]) * 100) + (parseInt(latest[1]) * 10) + parseInt(latest[2])) > ((parseInt(ver[0]) * 100) + (parseInt(ver[1]) * 10) + parseInt(ver[2])));
  }
});
GM_addStyle("#map{width:153px;border-width:1px}");
window.addEventListener("unload" , cleanup, false);
sRank = eval(GM_getValue('savedRank'));
if(typeof(sRank) == "undefined") {
sRank = new Object();
}
else{
for(var ms in sRank) {
  if(!isNaN(ms)) {
   sRank = new Object();
   break;
  }
}
sLen = 0;
for(var s in sRank) {
 sTotal += parseInt(sRank[s]);
 sLen++;
}
}

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.conquerclub.com/maps/maps.xml?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
    var mapxml = dom.getElementsByTagName('title');
    var gmMenu = document.createElement('div');
    gmMenu.id="missed";
    for(var i=0; i< mapxml.length; i++) {
      maps[i] = mapxml[i].firstChild.nodeValue;
    }
    var html = "<h3><b>Map Move <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=53395'>" + version + "</a></span></b></h3>";
    gmMenu.innerHTML = html;
    ul[0].parentNode.appendChild(gmMenu);
    ul = document.createElement ('ul');
    ul.style.borderWidth = "1px 1px 0px 1px";
    ul.style.width = "151px";
    ul.innerHTML += "<li><a href=\"javascript:void(0);\" id=mrank >Get Map Move</a></li>";
    gmMenu.appendChild(ul);
    ul = document.createElement('ul');
    ul.style.borderWidth = "0px 1px 0px 1px";
    ul.style.width = "151px";
    if(latestVersion) {
    ul.innerHTML = "<li><a id=\"latest\" href=http://userscripts.org/scripts/source/29038.user.js><span class=\"countdown-alert\">New Update Available</span></a></li>";
    gmMenu.appendChild(ul);
    }
    else{
      ul.innerHTML = "<li><a id=\"latest\" href=http://userscripts.org/scripts/source/29038.user.js><span>Latest Version Installed</span></a></li>";
      gmMenu.appendChild(ul);
    }
    var ftext = features.join("\n");
    document.getElementById('latest').addEventListener("click" , function () {
      alert('New version features\n' + ftext);
    },true);
    document.getElementById('mrank').addEventListener('click', function() {
      var link = "http://www.conquerclub.com/player.php?submit=Search&game_status=A,F";
       createBox("Collecting Games", '');
       total = maps.length;
       totals = new Totals();
       for(var m=0; m< maps.length; m++) {
         if(!classification[maps[m]]) {
          classification[maps[m]] = class0;
         }
         if(!sRank[maps[m]]) sRank[maps[m]] = 0;
         getStatsPage(link + "&map=" + maps[m],m);
       }
    }
    , true);
  }
});
}
}

