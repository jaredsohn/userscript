//
// ==UserScript==
// @name          Conquer Club Tour Stats
// @namespace     http://userscripts.org/
// @description   Produces Stats On Tournaments
// @include       http://www.conquerclub.com/player.php?mode=find*
// @include       https://www.conquerclub.com/player.php?mode=find*
// ==/UserScript==

Array.prototype.tsort = function(alpha,ref,type) {
if(alpha) this.sort(function(a,b) {
	return ((totals[ref][a][type] > totals[ref][b][type]) - (totals[ref][a][type] < totals[ref][b][type]));
});
else this.sort(function(a,b) {
	return (totals[ref][a][type] - totals[ref][b][type]);
});
}

var versionn = "1.1.3";
var latestVersionn = 0;
var features=[];
var proto;
var tourReq = [];
var totals;
var partial;
var label;
var pfilt = [];
var viewer = null;
var sorters = {'_players' : new Array(new Sorter(1,null), new Sorter(0,"_total"), new Sorter(0,"_won"), new Sorter(0,"_lost"), new Sorter(0,"_active"), new Sorter(0,"_elim"), new Sorter(1,"_kills")) , 
               '_games' : new Array(new Sorter(0,null), new Sorter(1,"_name"), new Sorter(0, "_round") , new Sorter(1,"_winners"),new Sorter(1,"_elims"))};
var teamsize = {'D' : 2, 'T' : 3, 'Q' : 4};               

function Totals() {	
this._pages = 0;
this._counter = 0;
this._players = new Object();
this._order = new Array();
this._labels = new Array();
this._games = new Object();
this._gorder = new Array();
this.addGame = function(game,map) {
 this._games[game] = new Game(map);
 this._gorder.push(game);
}
this.addPlayer = function(game,name) {
 this._players[name] = new Player();
 this._order.push(name);
}
this.addRound = function(game,round) {
 this._games[game]._round = round;
}
this.addVictor = function(game,name) {
 this._games[game]._victor = name;
}
this.addWinner = function(game,name) {
 this._players[name]._won++;
 this._games[game]._winners.push(name);
}
this.addLoser = function(game,name) {
 this._players[name]._lost++;
 this._games[game]._losers.push(name);
}
this.addActive = function(game,name) {
 this._players[name]._active++;
}
this.addTotal = function(game,name) {
 this._players[name]._total++;
}
this.addElim = function(game,name) {
 this._players[name]._lost--;
 this._players[name]._elim++;
}
this.addDefeat = function(game,name) {
 this._games[game]._elims.push(name);
}
this.setTeam = function(game,team) {
 this._games[game]._tnums.push(team);
}
this.addKill = function(kills,name) {
 this._players[name]._kills+= kills;
}
}

function Sorter(alpha,fn) {
this._alpha = alpha;
this._dir = 0;
this._fn = fn;
}

function Player() {
this._total = 0;
this._won = 0;
this._lost = 0;
this._active = 0;
this._elim = 0;
this._kills = 0;
}

function Game(name) {
this._name = name;
this._round = 0;
this._winners = new Array();
this._losers = new Array();
this._elims = new Array();
this._tnums = new Array();
this._victor = "";
}

function addState(state, param1,param2,lab,rgx) {
 label[''][state](param1,param2);
 if(lab) {
   label[lab][state](param1,param2);
   if(rgx && lab.match(rgx)) partial[state](param1,param2);
 }
}

function cleanup() {
totals = null;
tourReq = null;
if(viewer != null)viewer.close();
}

function removeBox() {
  viewer.close();
  viewer = null;
  tourReq = [];
}

function switchTabs(id) {
  if(id==1) {
    viewer.document.getElementById('tableContainer').style.visibility = "visible";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('tab1').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
  }
  else if(id==2) {
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "visible";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
  }
  else if(id==3) {
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "visible";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#0f0";
  }
}

function createBox(txt) {
  cleanup();
  viewer = window.open('','box','width=1040,height=720,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  viewer.addEventListener('unload', function() {
    viewer=null;
    cleanup();
    }, false);
  var style = viewer.document.getElementsByTagName('head')[0].appendChild(viewer.document.createElement("style"));
  style.type = 'text/css';
  style.innerHTML = "#rankDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;} ";
  style.innerHTML += "#rankBox {position:relative;min-width:1040px;height:100%;margin-top:10px;margin-left:20px;border:2px solid #000;background-color:#F2F5F6;} ";
  style.innerHTML += "#rankDiv > #rankBox {position:fixed;overflow:auto;} ";
  style.innerHTML += "#rankBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;} ";
  style.innerHTML += "#rankBox p {font:0.7em verdana,arial;padding-left:50px;width:900px;} .result {font-weight:bold;color:#00f;} .totals {color:#000;} ";
  style.innerHTML += "#rankBox a {text-decoration:none;} .central {text-align:center} #rankBox #tab1, #rankBox #tab2, #rankBox #tab3, #rankBox #tab4 {border:1px solid black}";
  style.innerHTML += "#rankBox #tab1:hover, #rankBox #tab2:hover, #rankBox #tab3:hover, #rankBox #tab4:hover , #rankBox #closeRank:hover {color:#fff} .header {background-color:#cdc;font-weight:bold;} ";
  style.innerHTML += "#rankBox #closeRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox img {position:relative;top:20px;left:20px;} .rankoptions {width:100px;} .bmedal {font-weight:bold;color:#8C7853} .smedal {font-weight:bold;color:silver} .gmedal {font-weight:bold;color:gold} ";
  style.innerHTML += ".display_div {width: 48px;padding: 0 2px 0 0;height: 20px;text-align: left;border: 1px solid;} ";
  style.innerHTML += ".display {background-color: #fff;color: blue;width: 48px;text-align: left;font-size: 8pt;font-family: verdana, arial, helvetica, sans-serif;font-weight: bold;cursor: text;}";
  style.innerHTML += "#tabs {text-align:center} #tabs table{align:center;margin-left:30px;} #tabs a {width:100px;font-weight:bold;font: verdana,arial;text-transform:none;color:gray;padding:0 5px} #tabs a:hover {background-color:#cdc}";
  style.innerHTML += "#scroller {width: 1000px;} #scroller, #scroller.td, #scroller.a, #summ td, #meds td {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style.innerHTML += "#resultant, #labelling {width: 1000px;} #resultant, #resultant.td, #resultant.a, #labelling, #labelling.td, #labelling.a {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style.innerHTML += "div.tableContainer {border: 1px solid #963;height: 535px;overflow:auto;overflow-x: hidden;width: 1000px;margin:10px} span {cursor:pointer;text-decoration:underline}";
  style.innerHTML += "#results, #labels {visibility:hidden;border: 1px solid #963;overflow:auto;overflow-x: hidden;width:1000px;height:535px;position:absolute;z-index:200;top:120px;margin:10px;}";
  style.innerHTML += "thead.fixedHeader tr, thead.scrollHeader tr, thead.totalsHeader tr {display: block} thead.fixedHeader td, tbody.scrollContent td.banner {background: #cdc;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 1000px}";
  style.innerHTML += "thead.scrollHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} ";
  style.innerHTML += "thead.totalsHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} span.winner {cursor:auto;text-decoration:none;color:red}";
  style.innerHTML += "thead.scrollHeader a, thead.scrollHeader a:link, thead.scrollHeader a:visited,thead.totalsHeader a, thead.totalsHeader a:link, thead.totalsHeader a:visited, tbody.scrollContent a, tbody.scrollContent a:link, tbody.scrollContent a:visited {display: block;width: 136px;}";
  style.innerHTML += "tbody.scrollContent {width: 100%;} tbody.scrollContent td#tourtitle,tbody.scrollContent td#rtourtitle, tbody.scrollContent td#pl, tbody.scrollContent td#rpl {font-size:12pt;color:blue;} tbody.scrollContent td#tourlabel {font-size:10pt;color:red}";
  style.innerHTML += "tbody.scrollContent td {border-right: 1px solid #b74;border-bottom: 1px solid #DDD;padding: 4px 3px;text-align:center;height:20px;} tbody.scrollContent td {width: 136px;vertical-align: middle;} ";
  style.innerHTML += "tbody.scrollContent tr.mreven {background-color:#ddd} tbody.scrollContent tr.mrodd {background-color:#eee} tbody.scrollContent td.sorton {background-color:cyan;cursor:pointer;}  tbody.scrollContent td.tiny {width:10%;} ";
  mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
  mObj.id = "rankDiv";
  mObj.style.visibility = 'hidden';
  mObj.style.height = viewer.document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(viewer.document.createElement("div"));
  alertObj.id = "rankBox";
  alertObj.style.left = (viewer.document.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  h1 = alertObj.appendChild(viewer.document.createElement("h1"));
  h1.appendChild(viewer.document.createTextNode("TOUR STATS"));
  msg = alertObj.appendChild(viewer.document.createElement("p"));
  msg.id = "progress";
  msg.innerHTML = txt;
  btn = alertObj.appendChild(viewer.document.createElement("a"));
  btn.id = "closeRank";
  btn.appendChild(viewer.document.createTextNode("CLOSE"));
  btn.href = "javascript:void(0);";
  btn.style.opacity = "0.5";
  btn.addEventListener('click', function() {
    if(btn.style.backgroundColor == "green")
    removeBox();
  }, true);
  tabs = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tabs.id = "tabs";
  tabs.innerHTML = "<table><tr><td><a href=\"javascript:void(0)\" id=tab1>Summary</a></td><td><a href=\"javascript:void(0)\" id=tab2>Results</a></td><td><a href=\"javascript:void(0)\" id=tab3>Labels</a></td></tr></table>";
  viewer.document.getElementById('tab1').addEventListener('click', function() {
    switchTabs(1);
  },true);
  viewer.document.getElementById('tab2').addEventListener('click', function() {
    switchTabs(2);
  },true);
  viewer.document.getElementById('tab3').addEventListener('click', function() {
    switchTabs(3);
  },true);
  tableWrap = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tableWrap.id = "tableContainer";
  tableWrap.className = "tableContainer";
  table = viewer.document.createElement("table"); 
  table.border=1;
  table.id = "scroller";
  table.width = "100%";
  table.cellSpacing = "0";
  table.cellPadding = "0";
  table.className = "scrollTable";
  tbody = table.appendChild(viewer.document.createElement("tbody"));
  tbody.className = "scrollContent";
  tbody.id = "ranktable";
  viewer.document.getElementById('tableContainer').appendChild(table);
  results = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  results.id = "results";
  results.className = "tableContainer";
  rtable = viewer.document.createElement("table"); 
  rtable.border=1;
  rtable.id = "resultant";
  rtable.width = "100%";
  rtable.cellSpacing = "0";
  rtable.cellPadding = "0";
  rtable.className = "scrollTable";
  rtbody = rtable.appendChild(viewer.document.createElement("tbody"));
  rtbody.className = "scrollContent";
  rtbody.id = "restable";
  viewer.document.getElementById('results').appendChild(rtable);
  lbs = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  lbs.id = "labels";
  lbs.className = "tableContainer";
  ltable = viewer.document.createElement("table"); 
  ltable.border=1;
  ltable.id = "labelling";
  ltable.width = "100%";
  ltable.cellSpacing = "0";
  ltable.cellPadding = "0";
  ltable.className = "scrollTable";
  ltbody = ltable.appendChild(viewer.document.createElement("tbody"));
  ltbody.className = "scrollContent";
  ltbody.id = "labtable";
  viewer.document.getElementById('labels').appendChild(ltable);
  mObj.style.visibility = 'visible';
  switchTabs(1);
}

function showMenu() {
var gmMenu = document.createElement('div');
gmMenu.id="trn";
var html = "<h3><b>Tour Stats <span style='font-size:7pt;' ><a href='" + proto + "//www.conquerclub.com/forum/viewtopic.php?f=59&t=86543'>" + versionn + "</a></span></b></h3>";
gmMenu.innerHTML = html;
ul[0].parentNode.appendChild(gmMenu);
ul = document.createElement('ul');
ul.style.borderWidth = "1px 1px 0px 1px";
ul.style.width = "151px";
if(latestVersionn) {
 ul.innerHTML = "<li><a id=\"alatest\" href=http://userscripts.org/scripts/source/49166.user.js><span class=\"attention\">New Update Available</span></a></li>";
 gmMenu.appendChild(ul);
}
else{
 ul.innerHTML = "<li><a id=\"alatest\" href=http://userscripts.org/scripts/source/49166.user.js><span>Latest Version Installed</span></a></li>";
 gmMenu.appendChild(ul);
}
var ftext = features.join("\n");
document.getElementById('alatest').addEventListener("click" , function () {
 alert('New version features\n' + ftext);
},true);
    
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
proto = window.location.protocol;
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fileden.com/files/2008/5/8/1902058/tour.txt?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      features = responseDetails.responseText.split('\n');
      var latest = features[0].split('.');
      var ver = versionn.split('.');
      latestVersionn = (((parseInt(latest[0]) * 100) + (parseInt(latest[1]) * 10) + parseInt(latest[2])) > ((parseInt(ver[0]) * 100) + (parseInt(ver[1]) * 10) + parseInt(ver[2])));
      showMenu();
  }
});
}
}

function sortByCol(arr,col,ref) {
if(sorters[ref][col]._fn != null) arr.tsort(sorters[ref][col]._alpha,ref,sorters[ref][col]._fn);
else if(sorters[ref][col]._alpha) arr.sort();
else arr.sort(function(a,b) {return(parseInt(a) - parseInt(b));});	
if(sorters[ref][col]._dir) arr.reverse();
sorters[ref][col]._dir = sorters[ref][col]._dir ? 0 : 1;
}

function setTable(tname,rnd) {
var pf = pfilt.join('');	
if(rnd && !rnd.match(/ - /)) rnd = " - " + rnd; 
var w = "<tr><td id=tourlabel colspan=7>Labels: ";
var x = "<tr><td id=tourtitle colspan=7><span id=label>" + tname + "</span>" + rnd + " : " + totals._order.length + " Players.</span></td></tr>";
var y = "<tr><td id=rtourtitle colspan=7><span id=rlabel>" + tname + "</span>" + rnd + " : " + totals._order.length + " Players.</span></td></tr>";
if(pf != "") {
	var pfs = pfilt.join(' ');;
	x+= "<tr><td colspan=7 id=pl>Summary For " + pfs + "</td></tr>";
	y+= "<tr><td colspan=7 id=rpl>Summary For " + pfs + "</td></tr>";
}
var xarr = new Array();
for(var z=0; z<label['']._labels.length; z++) {
xarr.push(" <span id=label" + z + ">" + label['']._labels[z] + "</span> ");
}
w += xarr + "</td></tr>";
x += "<tr><td id=sort0 class=sorton>Player</td><td id=sort1 class=sorton>Games</td><td id=sort2 class=sorton>Wins</td><td id=sort3 class=sorton>Losses</td><td id=sort4 class=sorton>Active</td><td id=sort5 class=sorton>Eliminated</td><td id=sort6 class=sorton>Kills</td></tr>";
y += "<tr><td id=res0 class=sorton>Game Number</td><td id=res1 class=sorton>Map</td><td id=res2 class=sorton>Round</td><td id=res3 class=sorton>Winners</td><td id=res4 class=sorton>Losers</td></tr>";
if(pf != "") {
	var summary = new Player();
	for(var pp=0; pp<4; pp++) {
		if(pfilt[pp] != "" && totals._players[pfilt[pp]]) {
			summary._total += totals._players[pfilt[pp]]._total;
			summary._won += totals._players[pfilt[pp]]._won;
			summary._lost += totals._players[pfilt[pp]]._lost;
			summary._active += totals._players[pfilt[pp]]._active;
			summary._elim += totals._players[pfilt[pp]]._elim;
			summary._kills += totals._players[pfilt[pp]]._kills;
		}
	}
	x += "<tr class=mreven><td>" + pfs + "</td><td>" + summary._total + "</td><td>" + summary._won + "</td><td>" + summary._lost + "</td><td>" + summary._active + "</td><td>" + summary._elim + "</td><td>" + summary._kills + "</td></tr>";  
}
else{
for(var i=0; i< totals._order.length;i++) {
 if(i & 1) trc = "<tr class=mrodd><td>";
 else trc = "<tr class=mreven><td>";
 x += trc + totals._order[i] + "</td><td>" + totals._players[totals._order[i]]._total + "</td><td>" + totals._players[totals._order[i]]._won + "</td><td>" + totals._players[totals._order[i]]._lost + "</td><td>" + totals._players[totals._order[i]]._active + "</td><td>" + totals._players[totals._order[i]]._elim + "</td><td>" + totals._players[totals._order[i]]._kills + "</td></tr>";  
}
}
var h = 0;
for(var g=0; g< totals._gorder.length; g++) {
if(totals._games[totals._gorder[g]]._winners.length) {
 if(h & 1) trc = "<tr class=mrodd><td class=tiny>";
 else trc = "<tr class=mreven><td class=tiny>";	
 if(pf == "" || (pfilt[0] != "" && (totals._games[totals._gorder[g]]._elims.indexOf(pfilt[0]) != -1 || totals._games[totals._gorder[g]]._winners.indexOf(pfilt[0]) != -1)) || 
 (pfilt[1] != "" && (totals._games[totals._gorder[g]]._elims.indexOf(pfilt[1]) != -1 || totals._games[totals._gorder[g]]._winners.indexOf(pfilt[1]) != -1)) ||
 (pfilt[2] != "" && (totals._games[totals._gorder[g]]._elims.indexOf(pfilt[2]) != -1 || totals._games[totals._gorder[g]]._winners.indexOf(pfilt[2]) != -1)) ||
 (pfilt[3] != "" && (totals._games[totals._gorder[g]]._elims.indexOf(pfilt[3]) != -1 || totals._games[totals._gorder[g]]._winners.indexOf(pfilt[3]) != -1))) {
 y += trc + "<a href=\"javascript:void(0);\" onclick='var wdw=window.open(\"" + proto + "//www.conquerclub.com/game.php?game=" + totals._gorder[g] + "\", \"seegame\");wdw.focus();' class=tiny>";
 if(totals._games[totals._gorder[g]]._victor) {
	 var winarray = new Array();
	 for(var wa=0; wa <  totals._games[totals._gorder[g]]._winners.length; wa++) {
		 if(totals._games[totals._gorder[g]]._winners[wa] == totals._games[totals._gorder[g]]._victor) winarray.push(totals._games[totals._gorder[g]]._winners[wa] + "<sup>&loz;</sup>");
		 else winarray.push(totals._games[totals._gorder[g]]._winners[wa]);
	 }
	 y += "<u>Game " + totals._gorder[g] + "</u></a></td><td>" + totals._games[totals._gorder[g]]._name + "</td><td>" + totals._games[totals._gorder[g]]._round + "</td><td><span class=winner>" + winarray + "</span></td><td>";
 }
 else
 y += "<u>Game " + totals._gorder[g] + "</u></a></td><td>" + totals._games[totals._gorder[g]]._name + "</td><td>" + totals._games[totals._gorder[g]]._round + "</td><td><span class=winner>" + totals._games[totals._gorder[g]]._winners + "</span></td><td>";
 var lost = new Array();
 if(totals._games[totals._gorder[g]]._tnums[0]) {
 	for(var t=0; t< totals._games[totals._gorder[g]]._elims.length; t++) {
	 lost.push(totals._games[totals._gorder[g]]._elims[t] + "<sup>" + totals._games[totals._gorder[g]]._tnums[t] + "</sup>");
 	}
 	y += lost + "</td></tr>";
 }
 else y += totals._games[totals._gorder[g]]._elims + "</td></tr>";
 }
 h++;
}
}
viewer.document.getElementById('ranktable').innerHTML = x;
viewer.document.getElementById('restable').innerHTML = y;
viewer.document.getElementById('labtable').innerHTML = w;
for(var j=0; j< sorters['_players'].length; j++) {
  viewer.document.getElementById('sort' + j).addEventListener('click', function() {
	sortByCol(totals._order,parseInt(this.id.split('sort')[1]),"_players");
	setTable(tname,rnd);
  },true);
}
for(var j=0; j< sorters['_games'].length; j++) {
  viewer.document.getElementById('res' + j).addEventListener('click', function() {
	sortByCol(totals._gorder,parseInt(this.id.split('res')[1]),"_games");
	setTable(tname,rnd);
  },true);
}
viewer.document.getElementById('label').addEventListener('click', function() {
	totals = label[''];
	setTable(tname,'');
 },true);
viewer.document.getElementById('rlabel').addEventListener('click', function() {
	totals = label[''];
	setTable(tname,'');
 },true); 
for(var k=0; k<label['']._labels.length; k++) {
  viewer.document.getElementById('label' + k).addEventListener('click', function() {
	var id = parseInt(this.id.split('label')[1]);
	totals = label[label['']._labels[id]];
	setTable(tname,label['']._labels[id]);
	switchTabs(1);
  },true);
}
}

function endGame(tname,rnd) {
if(rnd) totals = partial;
else totals = label[rnd];	
setTable(tname,rnd);
viewer.document.getElementById('closeRank').style.opacity = "0.9";
viewer.document.getElementById('closeRank').style.backgroundColor = "green";
viewer.document.getElementById('progress').innerHTML = "<b>Scan Complete. Click on light blue column headers to sort. Click again to reverse sort.</b>";
}

function getTour(tname,page,rnd) {
    var jump = proto + '//www.conquerclub.com/api.php?mode=gamelist&gs=A,F&to=' + encodeURIComponent(tname) + "&names=Y&events=Y";    
    if(page > 1) jump += "&page=" + page;
    tourReq['touring' + page] = new XMLHttpRequest();
    tourReq['touring' + page].open('GET', jump, true);
    tourReq['touring' + page].onreadystatechange = function() {
      if (tourReq['touring' + page].readyState == 4) {
       var parser = new DOMParser();
       var dom = parser.parseFromString(tourReq["touring" + page].responseText,"application/xml");
       var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;        
       var game = dom.getElementsByTagName('game');
       var numPages = 0;
       
       if(pages.match(/^(\d+) of (\d+)$/)) numPages = parseInt(RegExp.$2);
        if(page == 1) {
         if(numPages > 1) {
          for(var pg=2;pg<=numPages;pg++) {
           getTour(tname,pg,rnd);
          }
         }
        }
        for(g=0; g<game.length;g++) {
	        var tourney = game[g].getElementsByTagName('tournament')[0].firstChild.nodeValue;
	        var gameno = game[g].getElementsByTagName('game_number')[0].firstChild.nodeValue;
	        var mapname = game[g].getElementsByTagName('map')[0].firstChild.nodeValue;
	        var gametype = game[g].getElementsByTagName('game_type')[0].firstChild.nodeValue;
	        var roundNo = game[g].getElementsByTagName('round')[0].firstChild.nodeValue;
	        if(rnd) var rgx = new RegExp(rnd,"i");
	        if(tourney.match(/ - (.+?)$/)) {
	          var lab = RegExp.$1;
	          if(label['']._labels.indexOf(lab) == -1){
		          label['']._labels.push(lab);
		          label[lab] = new Totals();
	          }
		    }
		    addState('addGame', gameno,mapname,lab,rgx);
		    addState('addRound', gameno,roundNo,lab,rgx);
	        var players = game[g].getElementsByTagName('player');
	        var anames = new Array();
	        var tnums = new Array();
	        for(var p=0; p<players.length;p++) {
              var pname = players[p].firstChild.nodeValue;
              var aname = pname.substr(0,1).toUpperCase() + pname.substr(1, pname.length - 1);
              anames.push(aname);
              if(!label['']._players[aname]) label[''].addPlayer(gameno,aname);
		      if(lab && !label[lab]._players[aname]) {
			      label[lab].addPlayer(gameno,aname);
			      if(rnd && lab.match(rgx)) partial.addPlayer(gameno,aname);
		      }
		      if(players[p].getAttribute('state') == "Won") addState('addWinner', gameno,aname,lab,rgx);
		      else if(players[p].getAttribute('state') == "Lost") addState('addLoser', gameno,aname,lab,rgx);
		      else addState('addActive', gameno,aname,lab,rgx);
			  	addState('addTotal', gameno,aname,lab,rgx);
			  	if(gametype == "D" || gametype == "T" || gametype == "Q") tnums.push(1 + Math.floor( p / teamsize[gametype]));
			  	else tnums.push(0);			  
		     }		     
		     if(!label['']._games[gameno]._winners.length){
               for(l=0; l< label['']._games[gameno]._losers.length; l++) {
			     			addState('addElim', gameno,label['']._games[gameno]._losers[l],lab,rgx);
             		}
 				 }
			 	 else{
	           var events = game[g].getElementsByTagName('event');
	           for(var e=0; e<events.length;e++) {
                var ev = events[e].firstChild.nodeValue;
                if(ev.match(/^(\d) eliminated/)) {
	              	var def = parseInt(RegExp.$1);
	                if(def) addState('addKill', 1,anames[def-1],lab,rgx);
                } 
                if(ev.match(/^(\d) held/)) {
	              	var def = parseInt(RegExp.$1);
	                addState('addVictor', gameno,anames[def-1],lab,rgx);
                }                
                if(ev.match(/eliminated (\d)/) || ev.match(/^(\d) was kicked/) || ev.match(/^(\d) was a/) || ev.match(/^(\d) surrendered$/)) {
	              var def = parseInt(RegExp.$1);
	              if(label['']._games[gameno]._losers.indexOf(anames[def-1]) != -1) {
                    addState('addDefeat', gameno,anames[def-1],lab,rgx);
			     					addState('setTeam', gameno,tnums[def-1],lab,rgx);
                    if(label['']._games[gameno]._elims.length == label['']._games[gameno]._losers.length) break;
		          	}
                }
                else if(ev.match(/^(\d) held the objective$/)) {
	              var gm = label['']._games[gameno];
	              for(q=0; q< gm._losers.length; q++) {
		              if(gm._elims.indexOf(gm._losers[q]) == -1) addState('addDefeat', gameno,gm._losers[q],lab,rgx);		              
	              }
	              break;
                }
	           }
		 }
        }               
        label['']._pages++;
        viewer.document.getElementById('progress').innerHTML = "Scanning..." + (100 * (label['']._pages)/(numPages)).toFixed(0) + "%";
        if(label['']._pages == numPages) endGame(tname,rnd);
      }
      else if (tourReq['touring' + page].readyState == 1 && label['']._pages == 0) {
       viewer.document.getElementById('progress').innerHTML = "Scanning...0%";
      }

    }
    tourReq['touring' + page].send(null);
}

function getGames(glist,page) {
    var jump = proto + '//www.conquerclub.com/api.php?mode=gamelist&gn=' + glist + "&names=Y&events=Y";    
    if(page > 1) jump += "&page=" + page;
    tourReq['touring' + page] = new XMLHttpRequest();
    tourReq['touring' + page].open('GET', jump, true);
    tourReq['touring' + page].onreadystatechange = function() {
      if (tourReq['touring' + page].readyState == 4) {
       var parser = new DOMParser();
       var dom = parser.parseFromString(tourReq["touring" + page].responseText,"application/xml");
       var pages = dom.getElementsByTagName('page')[0].firstChild.nodeValue;        
       var game = dom.getElementsByTagName('game');
       var numPages = 0;
       
       if(pages.match(/^(\d+) of (\d+)$/)) numPages = parseInt(RegExp.$2);
        if(page == 1) {
         if(numPages > 1) {
          for(var pg=2;pg<=numPages;pg++) {
           getGames(glist,pg);
          }
         }
        }
        for(g=0; g<game.length;g++) {
	        var gameno = game[g].getElementsByTagName('game_number')[0].firstChild.nodeValue;
	        var mapname = game[g].getElementsByTagName('map')[0].firstChild.nodeValue;
	        var gametype = game[g].getElementsByTagName('game_type')[0].firstChild.nodeValue;
	        var roundNo = game[g].getElementsByTagName('round')[0].firstChild.nodeValue;
		    	addState('addGame', gameno,mapname,'','');
		    	addState('addRound', gameno,roundNo,'','');
	        var players = game[g].getElementsByTagName('player');
	        var anames = new Array();
	        var tnums = new Array();
	        for(var p=0; p<players.length;p++) {
              var pname = players[p].firstChild.nodeValue;
              var aname = pname.substr(0,1).toUpperCase() + pname.substr(1, pname.length - 1);
              anames.push(aname);
              if(!label['']._players[aname]) label[''].addPlayer(gameno,aname);
		      if(players[p].getAttribute('state') == "Won") addState('addWinner', gameno,aname,'','');
		      else if(players[p].getAttribute('state') == "Lost") addState('addLoser', gameno,aname,'','');
		      else addState('addActive', gameno,aname,'','');
			  	addState('addTotal', gameno,aname,'','');
			  	if(gametype == "D" || gametype == "T" || gametype == "Q") tnums.push(1 + Math.floor( p / teamsize[gametype]));
			  	else tnums.push(0);			  
		     }		     
		     if(!label['']._games[gameno]._winners.length){
               for(l=0; l< label['']._games[gameno]._losers.length; l++) {
			     			addState('addElim', gameno,label['']._games[gameno]._losers[l],'','');
             		}
 				 }
			 	 else{
	           var events = game[g].getElementsByTagName('event');
	           for(var e=0; e<events.length;e++) {
                var ev = events[e].firstChild.nodeValue;
                if(ev.match(/^(\d) eliminated/)) {
	              	var def = parseInt(RegExp.$1);
	                if(def) addState('addKill', 1,anames[def-1],'','');
                } 
                if(ev.match(/^(\d) held/)) {
	              	var def = parseInt(RegExp.$1);
	                addState('addVictor', gameno,anames[def-1],'','');
                }                
                if(ev.match(/eliminated (\d)/) || ev.match(/^(\d) was kicked/) || ev.match(/^(\d) was a/) || ev.match(/^(\d) surrendered$/)) {
	              var def = parseInt(RegExp.$1);
	              if(label['']._games[gameno]._losers.indexOf(anames[def-1]) != -1) {
                    addState('addDefeat', gameno,anames[def-1],'','');
			     					addState('setTeam', gameno,tnums[def-1],'','');
                    if(label['']._games[gameno]._elims.length == label['']._games[gameno]._losers.length) break;
		          	}
                }
                else if(ev.match(/^(\d) held the objective$/)) {
	              var gm = label['']._games[gameno];
	              for(q=0; q< gm._losers.length; q++) {
		              if(gm._elims.indexOf(gm._losers[q]) == -1) addState('addDefeat', gameno,gm._losers[q],'','');		              
	              }
	              break;
                }
	           }
		 }
        }               
        label['']._pages++;
        viewer.document.getElementById('progress').innerHTML = "Scanning..." + (100 * (label['']._pages)/(numPages)).toFixed(0) + "%";
        if(label['']._pages == numPages) endGame("Game List","");
      }
      else if (tourReq['touring' + page].readyState == 1 && label['']._pages == 0) {
       viewer.document.getElementById('progress').innerHTML = "Scanning...0%";
      }

    }
    tourReq['touring' + page].send(null);
}

window.addEventListener("unload" , cleanup, false);
if (!(/\&private=Y/.test(window.location.href)) && !(/\&submit=Join/.test(window.location.href))) {
var tour = document.getElementById('tournament');
var label = document.getElementById('label');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var player3 = document.getElementById('player3');
var player4 = document.getElementById('player4');
var buttonDiv = document.getElementById('tournament').parentNode.appendChild(document.createElement('input'));
buttonDiv.className = "button";
buttonDiv.id = "tour";
buttonDiv.type = "button";
buttonDiv.value = "Tour Stats";
buttonDiv = document.getElementById('game_number').parentNode.appendChild(document.createElement('span'));
buttonDiv.innerHTML = "Game List ";
var gbuttonDiv = document.getElementById('game_number').parentNode.appendChild(document.createElement('input'));
gbuttonDiv.id = "gamelist";
gbuttonDiv.type = "text";
gbuttonDiv.className = "field";
buttonDiv = document.getElementById('game_number').parentNode.appendChild(document.createElement('input'));
buttonDiv.className = "button";
buttonDiv.id = "gamestats";
buttonDiv.type = "button";
buttonDiv.value = "Game Stats";
document.getElementById('tour').addEventListener("click", function() {
    var tname = tour.value;
		pfilt[0] = player1.value.substr(0,1).toUpperCase() + player1.value.substr(1, player1.value.length - 1);
		pfilt[1] = player2.value.substr(0,1).toUpperCase() + player2.value.substr(1, player2.value.length - 1);
		pfilt[2] = player3.value.substr(0,1).toUpperCase() + player3.value.substr(1, player3.value.length - 1);
		pfilt[3] = player4.value.substr(0,1).toUpperCase() + player4.value.substr(1, player4.value.length - 1);
    for (var s in sorters) {
	  for(var d=0; d< sorters[s].length; d++) {
		sorters[s][d]._dir = 0;  
	  }  
    }
	createBox('Collecting Games');
	label[''] = new Totals();
	if(label.value) partial = new Totals();
	tourReq = [];
    getTour(tname,1,label.value);

}, false);
document.getElementById('gamestats').addEventListener("click", function() {
	createBox('Collecting Games');
	label[''] = new Totals();
	tourReq = [];
	var parsegameList = gbuttonDiv.value.replace(/ /g,",");
  getGames(parsegameList,1);
},false);
}

