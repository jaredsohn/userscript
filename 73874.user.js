//
// ==UserScript==
// @name          Conquer Club Dice Streaks
// @namespace     http://userscripts.org/
// @description   Records and Measures Dice and Roll Streaks
// @include       http://www.conquerclub.com/*
// ==/UserScript==

var dice,gdice,dgames;
var viewer = null;
var	omod = 75;
var outcomes, longout;
var lastref;
var aslen,dslen,elong,elen,along,dlong,wrstreak,lrstreak,wlen,llen,wlong,llong;
var mg = {'S' : 'Standard', 'C' : 'Terminator', 'A' : 'Assassin', 'D' : 'Doubles', 'T' : 'Triples', 'Q' : 'Quadruples'};

function Dice(row,game) {
	this._attack = new Array();
	this._defend = new Array();
	var dt = new Date();
	this._time = dt.getTime();
	this._game = game;
	var diceRolls = row[0].getElementsByTagName("li");
	for (var i=0;i<diceRolls.length;i++){
		this._attack.push(parseInt(diceRolls[i].innerHTML));
	}
	diceRolls = row[1].getElementsByTagName("li");
	for (var i=0;i<diceRolls.length;i++){
		this._defend.push(parseInt(diceRolls[i].innerHTML));
	}	
}

function Streaks() {
	this._runs = new Array();
	this._lengths = new Array();
}

Streaks.prototype.add = function(length) {
	if(!this._runs[length]) {
		this._runs[length] = 0;
		this._lengths.push(length);
	}
	this._runs[length]++;
}

Streaks.prototype.report = function(col) {
  var rep = "";
  this._lengths.sort(function(a,b) {return(a-b)});
  if(this._lengths.length) {
  	for(var s=this._lengths[0]; s<this._lengths[this._lengths.length-1]+1; s++) {
			rep += "<tr><td class=left>" + s + "</td><td class=align>";
			if(!this._runs[s]) rep += "0";
			else{
				for(var b=0; b<this._runs[s];b++) {
					if( b && b%75==0) rep += "<br />";
					rep += "<font size=2 class=ex color='" + col + "'>&#9608;</font>";
				}
				rep += this._runs[s];
			}
			rep += "</td></tr>";	  
  	}
	}
  return rep;
}

function cleanup() {
if(viewer != null)viewer.close();
}

function removeBox() {
  viewer.close();
  viewer = null;
}

function openBox() {
  cleanup();
  viewer = window.open('','box','width=1040,height=720,scrollbars=yes,resizable=yes,status=no,toolbar=no,location=no,directories=no,menubar=no,copyhistory=no');
  viewer.addEventListener('unload', function() {
    viewer=null;
    cleanup();
    }, false);
  var style = viewer.document.getElementsByTagName('head')[0].appendChild(viewer.document.createElement("style"));
  style.type = 'text/css';
  style.innerHTML = "#rankDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;} ";
  style.innerHTML += "#rankBox {position:relative;min-width:1040px;height:100%;margin-top:10px;margin-left:20px;border:2px solid #000;background-color:#ddd;} ";
  style.innerHTML += "#rankDiv > #rankBox {position:fixed;overflow:auto;} font {border:1px solid black;} font:hover {cursor:pointer} font.ex, font.streak {border:none;} font.streak{float:left;line-height: 33px}";
  style.innerHTML += "#rankBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;} ";
  style.innerHTML += "#rankBox h2 {margin:0;font:bold 0.9em verdana,arial;background-color:#eee;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;text-align:center} ";
  style.innerHTML += "#rankBox p.title {font:0.7em verdana,arial;padding-left:50px;width:900px;} #rankBox p {font-size:12px} #odice{width:200px;}";
  style.innerHTML += "#rankBox a {text-decoration:none;} .central {text-align:center} #rankBox #tab0,#rankBox #tab1, #rankBox #tab2, #rankBox #tab3, #rankBox #tab4,#rankBox #tab5,#rankBox #tab6 {border:1px solid black}";
  style.innerHTML += "#rankBox #tab0:hover, #rankBox #tab1:hover, #rankBox #tab2:hover, #rankBox #tab3:hover, #rankBox #tab4:hover, #rankBox #tab5:hover ,#rankBox #tab6:hover, #rankBox #closeRank:hover {color:#fff} .header {background-color:#cdc;font-weight:bold;} ";
  style.innerHTML += "#rankBox #closeRank {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;} ";
  style.innerHTML += "#rankBox img {position:relative;top:20px;left:20px;} .rankoptions {width:100px;} .bmedal {font-weight:bold;color:#8C7853} .smedal {font-weight:bold;color:silver} .gmedal {font-weight:bold;color:gold} ";
	style.innerHTML += "#rolls.many {height: 80px;overflow: auto;} #rolls .roll,#drolls .roll,#arolls .roll,#crolls .roll {height: 33px;} #rolls h4, #rolls p,#drolls p,#arolls p,#crolls p {display: inline;float:left;margin: 0;line-height: 33px;background-color:#ddd}";
	style.innerHTML += "#rolls p.attacker,#drolls p.attacker,#arolls p.attacker,#crolls p.attacker {color:blue} #rolls ul,#drolls ul,#arolls ul,#crolls ul {display: inline;padding: 0;} ";
	style.innerHTML += "#rolls li,#drolls li,#arolls li,#crolls li {float: left;list-style-type: none;background: url('http://www.conquerclub.com/static/dice.gif') no-repeat;width: 25px;height: 25px;text-indent: -9999px;margin-left: 2px;margin-right: 2px;margin-top: 1px;}";
	style.innerHTML += "#rolls li.winner {border: 3px solid #ff0;} #rolls li.loser,#drolls li.loser,#crolls li.loser {border: 3px solid #ff9c00;} #rolls li.reg,#drolls li.reg,#crolls li.reg {border: 3px solid #ddd;}";
	style.innerHTML += "#rolls ul.attack li.d1,#arolls ul.attack li.d1,#crolls ul.attack li.d1 {background-position: 0 -125px;} #rolls ul.attack li.d2,#arolls ul.attack li.d2,#crolls ul.attack li.d2 {background-position: 0 -100px;} #rolls ul.attack li.d3,#arolls ul.attack li.d3,#crolls ul.attack li.d3 {background-position: 0 -75px;}";
	style.innerHTML += "#rolls ul.attack li.d4,#arolls ul.attack li.d4,#crolls ul.attack li.d4 {background-position: 0 -50px;} #rolls ul.attack li.d5,#arolls ul.attack li.d5,#crolls ul.attack li.d5 {background-position: 0 -25px;} #drolls ul.defend li.d1,#arolls ul.defend li.d1,#crolls ul.defend li.d1 {background-position: -25px -125px;} #drolls ul.defend li.d2,#arolls ul.defend li.d2,#crolls ul.defend li.d2 {background-position: -25px -100px;}";
	style.innerHTML += "#drolls ul.defend li.d3,#arolls ul.defend li.d3,#crolls ul.defend li.d3 {background-position: -25px -75px;} #drolls ul.defend li.d4,#arolls ul.defend li.d4,#crolls ul.defend li.d4 {background-position: -25px -50px;} #drolls ul.defend li.d5,#arolls ul.defend li.d5,#crolls ul.defend li.d5 {background-position: -25px -25px;}";
	style.innerHTML += "#drolls ul.defend li.d6,#arolls ul.defend li.d6,#crolls ul.defend li.d6 {background-position: -25px 0;}";     
  style.innerHTML += ".display_div {width: 48px;padding: 0 2px 0 0;height: 20px;text-align: left;border: 1px solid; }";
  style.innerHTML += "#tabs {text-align:center} #tabs table{align:center;margin-left:30px;} #tabs a {width:100px;font-weight:bold;font: verdana,arial;text-transform:none;color:gray;padding:0 5px} #tabs a:hover {background-color:#cdc}";
  style.innerHTML += "#scroller {width: 1000px;} #scroller, #scroller.td, #scroller.a, #summ td, #meds td {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style.innerHTML += "#resultant, #labelling {width: 1000px;} #resultant, #resultant.td, #resultant.a, #labelling, #labelling.td, #labelling.a {color: #000;font: bold 7pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
  style.innerHTML += "div.tableContainer {border: 1px solid #963;height: 535px;overflow:auto;overflow-x: hidden;width: 1000px;margin:10px} span {cursor:pointer;text-decoration:underline}";
  style.innerHTML += "#results, #labels ,#tableContainer, #games, #combined, #summary,#dist{visibility:hidden;border: 1px solid #963;overflow:auto;overflow-x: hidden;width:1000px;height:535px;position:absolute;z-index:200;top:120px;margin:10px;}";
  style.innerHTML += "thead.fixedHeader tr, thead.scrollHeader tr, thead.totalsHeader tr {display: block} thead.fixedHeader td, tbody.scrollContent td.banner {background: #cdc;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 1000px}";
  style.innerHTML += "thead.scrollHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} ";
  style.innerHTML += "thead.totalsHeader td {background: #fff;border-right: 1px solid #B74;border-bottom: 1px solid #EB8;padding: 4px 3px;text-align: center;width: 136px;} span.winner {cursor:auto;text-decoration:none;color:red}";
  style.innerHTML += "thead.scrollHeader a, thead.scrollHeader a:link, thead.scrollHeader a:visited,thead.totalsHeader a, thead.totalsHeader a:link, thead.totalsHeader a:visited, tbody.scrollContent a, tbody.scrollContent a:link, tbody.scrollContent a:visited {display: block;width: 136px;}";
  style.innerHTML += "tbody.scrollContent {width: 100%;} tbody.scrollContent td#tourtitle,tbody.scrollContent td#rtourtitle, tbody.scrollContent td#pl, tbody.scrollContent td#rpl {font-size:12pt;color:blue;} tbody.scrollContent td#tourlabel {font-size:10pt;color:red}";
  style.innerHTML += "tbody.scrollContent td {border-right: 1px solid #b74;border-bottom: 1px solid #DDD;padding: 4px 3px;text-align:center;height:20px;} tbody.scrollContent td {width: 136px;vertical-align: middle;} ";
  style.innerHTML += "tbody.scrollContent tr.mreven {background-color:#ddd} tbody.scrollContent tr.mrodd {background-color:#eee} tbody.scrollContent td.sorton {background-color:cyan;cursor:pointer;}  tbody.scrollContent td.tiny {width:10%;} ";
  style.innerHTML += "#summary td.left,#labels td.left{width:30%} #dist table.scrollTable {text-align:center;} #dist td.left {width:10%} #dist td.align {text-align:left} #dist th {font: bold 10pt Verdana, Geneva, Arial, Helvetica, sans-serif}";
	style.innerHTML += "#dist tbody{border:1px solid black}";
  mObj = viewer.document.getElementsByTagName("body")[0].appendChild(viewer.document.createElement("div"));
  mObj.id = "rankDiv";
  mObj.style.height = viewer.document.documentElement.scrollHeight + "px";
  alertObj = mObj.appendChild(viewer.document.createElement("div"));
  alertObj.id = "rankBox";
  alertObj.style.left = (viewer.document.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  h1 = alertObj.appendChild(viewer.document.createElement("h1"));
  h1.appendChild(viewer.document.createTextNode("DICE STREAKS"));
  msg = alertObj.appendChild(viewer.document.createElement("p"));
  msg.id = "progress";
  msg.className = "title";
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
  tabs.innerHTML = "<table><tr><td><a href=\"javascript:void(0)\" id=tab0>Combined Dice</a></td><td><a href=\"javascript:void(0)\" id=tab1>Attack Dice</a></td><td><a href=\"javascript:void(0)\" id=tab2>Defence Dice</a></td><td><a href=\"javascript:void(0)\" id=tab3>Outcomes</a></td><td><a href=\"javascript:void(0)\" id=tab6>Distribution</a></td><td><a href=\"javascript:void(0)\" id=tab5>Summary</a></td><td><a href=\"javascript:void(0)\" id=tab4>Games</a></td></tr></table>";
  viewer.document.getElementById('tab0').addEventListener('click', function() {
    switchTabs(0);
  },true);
  viewer.document.getElementById('tab1').addEventListener('click', function() {
    switchTabs(1);
  },true);
  viewer.document.getElementById('tab2').addEventListener('click', function() {
    switchTabs(2);
  },true);
  viewer.document.getElementById('tab3').addEventListener('click', function() {
    switchTabs(3);
  },true);
  viewer.document.getElementById('tab4').addEventListener('click', function() {
    switchTabs(4);
  },true);
  viewer.document.getElementById('tab5').addEventListener('click', function() {
    switchTabs(5);
  },true);
  viewer.document.getElementById('tab6').addEventListener('click', function() {
    switchTabs(6);
  },true);
  comb = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  comb.id = "combined";
  comb.className = "tableContainer";
  tableWrap = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  tableWrap.id = "tableContainer";
  tableWrap.className = "tableContainer";
  results = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  results.id = "results";
  results.className = "tableContainer";
  lbs = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  lbs.id = "labels";
  lbs.className = "tableContainer";
  gms = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  gms.id = "games";
  gms.className = "tableContainer";
  dist = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  dist.id = "dist";
  dist.className = "tableContainer";
  summ = viewer.document.getElementById('rankBox').appendChild(viewer.document.createElement("div"));
  summ.id = "summary";
  summ.className = "tableContainer";
  mObj.style.visibility = 'visible';
  switchTabs(0);  
}

function switchTabs(id) {
  if(id==0) {
    viewer.document.getElementById('combined').style.visibility = "visible";
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('games').style.visibility = "hidden";
    viewer.document.getElementById('summary').style.visibility = "hidden";
    viewer.document.getElementById('dist').style.visibility = "hidden";
    viewer.document.getElementById('tab0').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab5').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab6').style.backgroundColor = "#cdc";
  }
  else if(id==1) {
    viewer.document.getElementById('combined').style.visibility = "hidden";
    viewer.document.getElementById('tableContainer').style.visibility = "visible";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('games').style.visibility = "hidden";
    viewer.document.getElementById('summary').style.visibility = "hidden";
    viewer.document.getElementById('dist').style.visibility = "hidden";
    viewer.document.getElementById('tab0').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab1').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab5').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab6').style.backgroundColor = "#cdc";
  }
  else if(id==2) {
    viewer.document.getElementById('combined').style.visibility = "hidden";
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "visible";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('games').style.visibility = "hidden";
    viewer.document.getElementById('summary').style.visibility = "hidden";
    viewer.document.getElementById('dist').style.visibility = "hidden";
    viewer.document.getElementById('tab0').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab5').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab6').style.backgroundColor = "#cdc";
  }
  else if(id==3) {
    viewer.document.getElementById('combined').style.visibility = "hidden";
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "visible";
    viewer.document.getElementById('games').style.visibility = "hidden";
    viewer.document.getElementById('summary').style.visibility = "hidden";
    viewer.document.getElementById('dist').style.visibility = "hidden";
    viewer.document.getElementById('tab0').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab5').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab6').style.backgroundColor = "#cdc";
  }
  else if(id==4) {
    viewer.document.getElementById('combined').style.visibility = "hidden";
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('games').style.visibility = "visible";
    viewer.document.getElementById('summary').style.visibility = "hidden";
    viewer.document.getElementById('dist').style.visibility = "hidden";
    viewer.document.getElementById('tab0').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab4').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab5').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab6').style.backgroundColor = "#cdc";
  }
  else if(id==5) {
    viewer.document.getElementById('combined').style.visibility = "hidden";
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('games').style.visibility = "hidden";
    viewer.document.getElementById('summary').style.visibility = "visible";
    viewer.document.getElementById('dist').style.visibility = "hidden";
    viewer.document.getElementById('tab0').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab5').style.backgroundColor = "#0f0";
    viewer.document.getElementById('tab6').style.backgroundColor = "#cdc";
  }
  else if(id==6) {
    viewer.document.getElementById('combined').style.visibility = "hidden";
    viewer.document.getElementById('tableContainer').style.visibility = "hidden";
    viewer.document.getElementById('results').style.visibility = "hidden";
    viewer.document.getElementById('labels').style.visibility = "hidden";
    viewer.document.getElementById('games').style.visibility = "hidden";
    viewer.document.getElementById('summary').style.visibility = "hidden";
    viewer.document.getElementById('dist').style.visibility = "visible";
    viewer.document.getElementById('tab0').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab1').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab2').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab3').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab4').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab5').style.backgroundColor = "#cdc";
    viewer.document.getElementById('tab6').style.backgroundColor = "#0f0";
  }
}

function calcResult(dicenum) {
	var score = 0;
	var attack = dicenum._attack.slice();
	var defend = dicenum._defend.slice();
	
	for (var i=0;i<attack.length;i++)
		for (var j=i+1;j<attack.length;j++)
			if (attack[i]<attack[j])
			{
				var tmp = attack[i];
				attack[i] = attack[j];
				attack[j] = tmp;
			}	
	for (var i=0;i<defend.length;i++)
		for (var j=i+1;j<defend.length;j++)
			if (defend[i]<defend[j])
			{
				var tmp = defend[i];
				defend[i] = defend[j];
				defend[j] = tmp;
			}
	for (var i=0;i<Math.min(defend.length, attack.length);i++){
		if (attack[i] > defend[i]) score++;
		else score--;
		
	}
	var ref = attack.length + "v" + defend.length;
	var actualref = (score < 0) ? ref + " loss" : (score > 0) ? ref + " win" : ref + " tie";
	if(!outcomes[actualref]) outcomes[actualref] = 0;
	if(!longout[actualref]) longout[actualref] = 0;

	if(actualref == lastref) {
		outcomes[actualref]++;
		if(outcomes[actualref] > longout[actualref]) longout[actualref] = outcomes[actualref];
	}
	else{
		outcomes[actualref] = 1;
		if(!longout[actualref]) longout[actualref] = 1;
	}
	lastref = actualref;
	return score;			
}


function analyzeDiceRolls(diceInfo)
{
	var roll = diceInfo.getElementsByTagName("div");
	if(window.location.href.match(/game=(\d+)/)) var gm = parseInt(RegExp.$1); 	
	for (var i=0;i<roll.length;i++){
		var dicerow = roll[i].getElementsByTagName("ul");
		dice.push(new Dice(dicerow,gm));
	}
	if(gm && dgames.indexOf(gm) == -1) {
		dgames.push(gm);
		GM_setValue("recgame", uneval(dgames));
	}
	GM_setValue("dice", uneval(dice));
}

function showDice(e) {
var relTarg = e.target || e.srcElement;
if(relTarg.id) {
	if(relTarg.id.match(/^out(\d+)$/)) {
		var ind = parseInt(RegExp.$1);
		var showa = "<ul class=attack>";
		for(var s=0; s<gdice[ind]._attack.length; s++) {
			showa += getDiceIcon(gdice[ind]._attack[s],0);
		}
		showa += "</ul><ul class=defend>";
		for(var s=0; s<gdice[ind]._defend.length; s++) {
			showa += getDiceIcon(gdice[ind]._defend[s],0);
		}
		showa += "</ul>";
		viewer.document.getElementById('odice').innerHTML = showa;
	}
}
}

function hideDice(e) {
}

function streak(game) {
	gdice = new Array();
	if(game) {
		for(var y=0; y<dice.length;y++) {
			if(dice[y]._game == game) gdice.push(dice[y]);
		}
	}
	else{
		gdice = dice;
	}
	var as = new Array();
	var ds = new Array();
	var cs = new Array();
	var ss = new Array();
	var astreak = 0;
	var dstreak = 0;
	var cstreak = 0;
	aslen = 0;
	dslen = 0;
	cslen = 0;
	wrstreak = 0;
	lrstreak = 0;
	wlen = 0;
	llen = 0;
	outcomes = new Object();
	longout = new Object();
	
	var streake = new Array();
	var winstreak = new Streaks();
	var losestreak = new Streaks();
	var streaka = new Streaks();
	var streakc = new Streaks();
	var streakd = new Streaks();

	for(var ee=0; ee< 3 ; ee++) {
		streake[ee] = new Streaks();
	}

		
	wlong = 0;
	llong = 0;
	elong = new Array(3);
	elen = new Array(3);
	along = new Array(6);
	dlong = new Array(6);
	clong = new Array(6);
	for(var v=0; v<6; v++) {
		along[v] = 0;
		dlong[v] = 0;
		clong[v] = 0;
	}
	for(var ee=0; ee< 3 ; ee++) {
		elong[ee] = 0;
		elen[ee] = 0;
	}
	
	for(var d=0; d<gdice.length; d++) {
		for(var w=0; w< gdice[d]._attack.length;w++) {
			as.push(gdice[d]._attack[w]);
			cs.push(gdice[d]._attack[w]);
			ss.push(1);
		}
		for(var w=0; w< gdice[d]._defend.length;w++) {
			ds.push(gdice[d]._defend[w]);
			cs.push(gdice[d]._defend[w]);
			ss.push(0);
		}
	}		
	var html = "";
	var bank = "";
	var htmla = "", htmld = "", htmlr = "", htmlg = "", htmlc = "", htmln = "";
	var idice = "";
	
	if(game) html = "<h4>Game " + game + " ";
	else html = "<h4>";
	html += "Dice Streaks Marked in Orange. Outcomes: <font class=ex size=3 color='red'>&#9608;</font> Defender wins <font class=ex size=3 color='yellow'>&#9608;</font> 1 each <font class=ex size=3 color='blue'>&#9608;</font> Attacker wins</h4>";
	htmla = "<div id=rolls><div class=rolls><table id=scroller class=scrollTable><tr><td><p>Number of Dice : " + as.length + "</p></td><td id=astreak>&nbsp;</td></tr></table></div></div><br />";
	htmla += "<div id=rolls class=rolls><ul class=attack>";
	for(var x=0; x<as.length; x++) {
		if(as[x] == astreak) {
				if(bank) {
					htmla += getDiceIcon(as[x-1],1)
					bank = "";
				}
				htmla += getDiceIcon(as[x],1);
				aslen++;
				if(aslen > along[as[x] - 1 ]) along[as[x]-1] = aslen;
			}
			else {
				if(bank) htmla += bank;
				bank = getDiceIcon(as[x],0);
				if(aslen>1)streaka.add(aslen);
				aslen = 1;
				if(!along[as[x]-1]) along[as[x]-1] = 1; 
			}
			astreak = as[x];
	}	
	if(aslen>1) streaka.add(aslen);
	if(bank) htmla += bank;
	htmla += "</ul></div><br /><br />";
	bank = "";
	htmld = "<div id=drolls><div class=rolls><table id=resultant class=scrollTable><tr><td><p>Number of Dice : " + ds.length + "</p></td><td id=dstreak>&nbsp;</td></tr></table></div></div><br />";
	htmld += "<div id=drolls class=rolls><ul class=defend>";
		for(var x=0; x< ds.length; x++) {
		if(ds[x] == dstreak) {
			if(bank) {
				htmld += getDiceIcon(ds[x-1],1)
				bank = "";
			}
			htmld += getDiceIcon(ds[x],1);
			dslen++;
			if(dslen > dlong[ds[x] - 1]) dlong[ds[x] - 1] = dslen;
		}
		else {
			if(bank) htmld += bank;
			bank = getDiceIcon(ds[x],0);
			if(dslen>1)streakd.add(dslen);
			dslen = 1;
			if(!dlong[ds[x]-1]) dlong[ds[x]-1] = 1; 
		}
		dstreak = ds[x];
	}	
	if(dslen>1) streakd.add(dslen);
	if(bank) htmld += bank;
	htmld += "</ul></div><br /><br />";
	bank = "";
	
	htmlc = "<div id=crolls><div class=rolls><table id=scroller class=scrollTable><tr><td><p>Number of Dice : " + cs.length + "</p></td><td id=cstreak>&nbsp;</td></tr></table></div></div><br />";
	htmlc += "<div id=crolls class=rolls>";
	var htmlu="";
	for(var x=0; x<cs.length; x++) {
		if(cs[x] == cstreak) {
				if(bank) {
					htmlu = (ss[x-1])? "<ul class=attack>" : "<ul class=defend>";
					htmlc += htmlu + getDiceIcon(cs[x-1],1) + "</ul>";
					bank = "";
				}
				htmlu = (ss[x])? "<ul class=attack>" : "<ul class=defend>";
				htmlc += htmlu + getDiceIcon(cs[x],1) + "</ul>";
				cslen++;
				if(cslen > clong[cs[x] - 1 ]) clong[cs[x]-1] = cslen;
			}
			else {
				if(bank) htmlc += bank;
				htmlu = (ss[x])? "<ul class=attack>" : "<ul class=defend>";
				bank = htmlu + getDiceIcon(cs[x],0) + "</ul>";
				if(cslen>1)streakc.add(cslen);
				cslen = 1;
				if(!clong[cs[x]-1]) clong[cs[x]-1] = 1; 
			}
			cstreak = cs[x];
	}	
	if(cslen>1) streakc.add(cslen);
	if(bank) htmlc += bank;
	htmlc += "</div><br /><br />";
	bank = "";
				
	htmlr = "<div id=arolls><div class=rolls><table id=labelling class=scrollTable><tr><td><p>Number of Rolls : " + gdice.length + "</p></td><td id=ostreak>&nbsp;</td><td id=odice>&nbsp;</td></tr>";
	htmlr += "<tr><td><p>Longest Streaks:&nbsp;</p></p><td id=idice colspan=2>&nbsp;</td></tr><tr><td class=left id=wdice>&nbsp;</td><td id=ldice>&nbsp;</td><td>&nbsp;</td></tr></table></div></div><br />";
	
	var dc = Math.floor(gdice.length/omod);
	
	var enum = -1;
	lastref = "";
	htmlr += "<div id=drolls class=rolls>";
	for(var dd=0; dd<dc; dd++) {
		for(var d=0; d<omod; d++) {
			var res = calcResult(gdice[(dd*omod) + d]);
			if(res < 0) {
				htmlr += "<font size=3 id=\"out" + ((dd*omod) + d) + "\" color='red'>&#9608;</font>";
				if(enum==0) {
					elen[0]++;
					if(elen[0] > elong[0]) elong[0] = elen[0];
				}
				else{
					if(elen[0] > 1) streake[0].add(elen[0]);
					elen[0] = 1;
					if(!elong[0]) elong[0] = 1;
				}
				enum = 0;
				if(lrstreak) {
					lrstreak += (-res);
					if(lrstreak > llong) llong = lrstreak;
				}
				else{
					lrstreak = (-res);
					if(!llong) llong = (-res);
				}
				if(wrstreak) {
					if(wrstreak > 1) winstreak.add(wrstreak);
					wrstreak = 0;
				}
			}
			else if(res == 0) {
				htmlr += "<font size=3 id=\"out" + ((dd*omod) + d) + "\" color='yellow'>&#9608;</font>";
				if(enum==1) {
					elen[1]++;
					if(elen[1] > elong[1]) elong[1] = elen[1];
				}
				else{
					if(elen[1] > 1) streake[1].add(elen[1]);
					elen[1] = 1;					
					if(!elong[1]) elong[1] = 1;
				}
				enum = 1;
				if(lrstreak) {
					lrstreak += 1;
					if(lrstreak > llong) llong = lrstreak;
				}
				else{
					lrstreak = 1;
					if(!llong) llong = 1;
				}
				if(wrstreak) {
					wrstreak += 1;
					if(wrstreak > wlong) wlong = wrstreak;
				}
				else{
					wrstreak = 1;
					if(!wlong) wlong = 1;
				}
			}
			else {
				htmlr += "<font size=3 id=\"out" + ((dd*omod) + d) + "\" color='blue'>&#9608;</font>";
				if(enum==2) {
					elen[2]++;
					if(elen[2] > elong[2]) elong[2] = elen[2];
				}
				else{
					if(elen[2] > 1) streake[2].add(elen[2]);
					elen[2] = 1;
					if(!elong[2]) elong[2] = 1;
				}
				enum = 2;
				if(wrstreak) {
					wrstreak += res;
					if(wrstreak > wlong) wlong = wrstreak;
				}
				else{
					wrstreak = res;
					if(!wlong) wlong = res;
				}
				if(lrstreak) {
					if(lrstreak > 1) losestreak.add(lrstreak);
					lrstreak = 0;
				}
			}
		}
		htmlr += "<br />";
	}
	
	for(var dd=(dc*omod); dd<gdice.length; dd++) {
			var res = calcResult(gdice[dd]);
			if(res < 0) {
				htmlr += "<font size=3 id=\"out" + dd + "\" color='red'>&#9608;</font>";
				if(enum==0) {
					elen[0]++;
					if(elen[0] > elong[0]) elong[0] = elen[0];
				}
				else{
					if(elen[0] > 1) streake[0].add(elen[0]);
					elen[0] = 1;
					if(!elong[0]) elong[0] = 1;
				}
				enum = 0;
				if(lrstreak) {
					lrstreak += (-res);
					if(lrstreak > llong) llong = lrstreak;
				}
				else{
					lrstreak = (-res);
					if(!llong) llong = (-res);
				}
				if(wrstreak) {
					if(wrstreak > 1) winstreak.add(wrstreak);
					wrstreak = 0;
				}
			}
			else if(res == 0) {
				htmlr += "<font size=3 id=\"out" + dd + "\" color='yellow'>&#9608;</font>";
				if(enum==1) {
					elen[1]++;
					if(elen[1] > elong[1]) elong[1] = elen[1];
				}
				else{
					if(elen[1] > 1) streake[1].add(elen[1]);
					elen[1] = 1;
					if(!elong[1]) elong[1] = 1;
				}
				enum = 1;
				if(lrstreak) {
					lrstreak += (-res);
					if(lrstreak > llong) llong = lrstreak;
				}
				else{
					lrstreak = 1;
					if(!llong) llong = 1;
				}
				if(wrstreak) {
					wrstreak += 1;
					if(wrstreak > wlong) wlong = wrstreak;
				}
				else{
					wrstreak = 1;
					if(!wlong) wlong = 1;
				}
			}
			else {
				htmlr += "<font size=3 id=\"out" + dd + "\" color='blue'>&#9608;</font>";
				if(enum==2) {
					elen[2]++;
					if(elen[2] > elong[2]) elong[2] = elen[2];
				}
				else{
					if(elen[2] > 1) streake[2].add(elen[2]);
					elen[2] = 1;
					if(!elong[2]) elong[2] = 1;
				}
				enum = 2;
				if(wrstreak) {
					wrstreak += res;
					if(wrstreak > wlong) wlong = wrstreak;
				}
				else{
					wrstreak = res;
					if(!wlong) wlong = res;
				}
				if(lrstreak) {
					if(lrstreak > 1) losestreak.add(lrstreak);
					lrstreak = 0;
				}
			}
	}
	if(wrstreak > 1) winstreak.add(wrstreak);
	if(lrstreak > 1) losestreak.add(lrstreak);
	if(elen[0] > 1) streake[0].add(elen[0]);
	if(elen[1] > 1) streake[1].add(elen[1]);
	if(elen[2] > 1) streake[2].add(elen[2]);
		
	htmlg = "<h2>Recorded Games (Click to see streaks, Hover to see game info)</h2></h2><br /><a href=\"javascript:void(0);\" id=games0><u><b>All Games</b></u></a>&nbsp;&nbsp;";
	for(var dg=0; dg<dgames.length;dg++) {
		htmlg += "<a href=\"javascript:void(0);\" id=games" + dgames[dg] + "><u><b>Game " + dgames[dg] + "</b></u></a>&nbsp;&nbsp;";
	}
	
	htmln = "<table id=scroller class=scrollTable><col width=\"10%\" />";
	htmln += "<tbody border=1><thead><tr><th colspan=2>Dice Streaks</th></tr></thead><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += streakc.report("limegreen");
	htmln += "</tbody><tbody><tr><th colspan=2>Attack Dice</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += streaka.report("limegreen");
	htmln += "</tbody><tbody><tr><th colspan=2>Defence Dice</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += streakd.report("limegreen");
	htmln += "</tbody><tbody><tr><th colspan=2>Winning Outcomes</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += streake[2].report("blue");
	htmln += "</tbody><tbody><tr><th colspan=2>Drawing Outcomes</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += streake[1].report("yellow");
	htmln += "</tbody><tbody><tr><th colspan=2>Losing Outcomes</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += streake[0].report("red");
	htmln += "</tbody><tbody><tr><th colspan=2>Consecutive Troop Defeats</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += winstreak.report("blue");
	htmln += "</tbody><tbody><tr><th colspan=2>Consecutive Troop Losses</th></tr><tr><td class=left>Streak Length</td><td class=align>Number Of Streaks</td></tr>";
	htmln += losestreak.report("red");
	htmln += "</tbody></table>";
	
	
	htmls = "<div id=crolls><div class=rolls><table id=scroller class=scrollTable><tr><td class=left><p>Number of Dice : " + cs.length + "</p></td><td class=right id=scstreak>&nbsp;</td></tr></table></div></div>";
	htmls += "<div id=rolls><div class=rolls><table id=scroller class=scrollTable><tr><td class=left><p>Number of Attack Dice : " + as.length + "</p></td><td class=right id=sastreak>&nbsp;</td></tr></table></div></div>";
	htmls += "<div id=drolls><div class=rolls><table id=resultant class=scrollTable><tr><td class=left><p>Number of Defence Dice : " + ds.length + "</p></td><td class=right id=sdstreak>&nbsp;</td></tr></table></div></div>";
	htmls += "<div id=arolls><div class=rolls><table id=labelling class=scrollTable><tr><td class=left><p>Number of Rolls : " + gdice.length + "</p></td><td class=right id=sostreak>&nbsp;</td></tr>";
	htmls += "<tr><td><p>Longest Streaks:&nbsp;</p></td><td id=sidice>&nbsp;</td></tr><tr><td class=left id=swdice>&nbsp;</td><td class=right id=sldice>&nbsp;</td></tr></table></div></div>";
	viewer.document.getElementById('closeRank').style.opacity = "0.9";
	viewer.document.getElementById('closeRank').style.backgroundColor = "green";
  viewer.document.getElementById('combined').innerHTML = htmlc;
  viewer.document.getElementById('summary').innerHTML = htmls;
  viewer.document.getElementById('dist').innerHTML = htmln;
  viewer.document.getElementById('tableContainer').innerHTML = htmla;
  viewer.document.getElementById('results').innerHTML = htmld;
  viewer.document.getElementById('labels').innerHTML = htmlr;	
  viewer.document.getElementById('games').innerHTML = htmlg;	
	viewer.document.getElementById('progress').innerHTML = html;
	var alongate = '<p>Longest Streaks:&nbsp;</p>';
	var dlongate = '<p>Longest Streaks:&nbsp;</p>';
	var clongate = '<p>Longest Streaks:&nbsp;</p>';
	
	for(var f=0; f<6; f++) {
		alongate += "<ul class=attack>" + getDiceIcon(f+1,0) + "</ul><p class=attacker> : " + along[f] + "&nbsp;&nbsp;&nbsp;</p>";
		dlongate += "<ul class=defend>" + getDiceIcon(f+1,0) + "</ul><p class=attacker> : " + dlong[f] + "&nbsp;&nbsp;&nbsp;</p>";
		clongate += "<p>" + (f+1) + "</p><p class=attacker> : " + clong[f] + "&nbsp;&nbsp;&nbsp;</p>";
	}
	idice = "";
	for(var h in longout) {
		if(h.match(/win/)) fnt=h.replace("win","<font class=streak size=3 color='blue'>&#9608;</font>");
		if(h.match(/loss/)) fnt=h.replace("loss","<font class=streak size=3 color='red'>&#9608;</font>");
		if(h.match(/tie/)) fnt=h.replace("tie","<font class=streak size=3 color='yellow'>&#9608;</font>");
		idice += "<p>" + fnt + " : " + longout[h] + "&nbsp;&nbsp;&nbsp;</p>";
	}	
	var olongate = "<p>Longest Streaks:&nbsp;</p>";
	olongate += "<font class=streak size=3 color='red'>&#9608;</font><p>&nbsp;:&nbsp;" + elong[0] + "&nbsp;</p>";
	olongate += "<font size=3 class=streak color='yellow'>&#9608;</font><p>&nbsp;:&nbsp;" + elong[1] + "&nbsp;</p>";
	olongate += "<font class=streak size=3 color='blue'>&#9608;</font><p>&nbsp;:&nbsp;" + elong[2];
	var slongate = olongate;	
	olongate += "&nbsp;&nbsp;(Hover to see dice)</p>";
	var wlongate = "<p>Most Consecutive Troops Defeated: " + wlong + "</p>";
	var llongate = "<p>Most Consecutive Troops Lost: " + llong + "</p>";
	viewer.document.getElementById('astreak').innerHTML = alongate;
	viewer.document.getElementById('dstreak').innerHTML = dlongate;
	viewer.document.getElementById('cstreak').innerHTML = clongate;
	viewer.document.getElementById('ostreak').innerHTML = olongate;
  viewer.document.getElementById('idice').innerHTML = idice;	
  viewer.document.getElementById('wdice').innerHTML = wlongate;	
  viewer.document.getElementById('ldice').innerHTML = llongate;	
	viewer.document.getElementById('sastreak').innerHTML = alongate;
	viewer.document.getElementById('sdstreak').innerHTML = dlongate;
	viewer.document.getElementById('scstreak').innerHTML = clongate;
	viewer.document.getElementById('sostreak').innerHTML = slongate;
  viewer.document.getElementById('sidice').innerHTML = idice;	
  viewer.document.getElementById('swdice').innerHTML = wlongate;	
  viewer.document.getElementById('sldice').innerHTML = llongate;	
  
	viewer.document.addEventListener('mouseover', function(e) {
		showDice(e);
  }, true);
	viewer.document.addEventListener('mouseout', function(e) {
		hideDice(e);
  }, true);

	viewer.document.getElementById('games0').addEventListener('click', function() {
		streak(0);
  	switchTabs(0);	
  }, true);
  
	for(var dg=0; dg<dgames.length;dg++) {
		viewer.document.getElementById('games' + dgames[dg]).addEventListener('click', function() {
			var id = parseInt(this.id.split('games')[1]);
			streak(id);
  		switchTabs(0);	
  	}, true);
	}
  
	for(var dg=0; dg<dgames.length;dg++) {
		viewer.document.getElementById('games' + dgames[dg]).addEventListener('mouseover', function() {
			var id = parseInt(this.id.split('games')[1]);
  		gameDetails(id);
  	}, true);
	}
  
}

function gameDetails(dog) {
if(!viewer.document.getElementById('games' + dog).title) {
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.conquerclub.com/api.php?mode=gamelist&gn=' + dog,
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
    var map = dom.getElementsByTagName('map')[0].firstChild.nodeValue;
    var players = dom.getElementsByTagName('player').length;
    var gt = dom.getElementsByTagName('game_type')[0].firstChild.nodeValue;
    viewer.document.getElementById('games' + dog).title = map + " " + players + "p " + mg[gt];
  }
});
}	
}

function getDiceIcon(roll,high) {
	var loser = high? " loser" : " reg";
	return "<li class=\"d" + roll + loser + "\">" + roll + "</li>";
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
dice = eval(GM_getValue('dice'));
dgames = eval(GM_getValue('recgame'));
if(typeof(dice) == "undefined") dice = new Array();
if(typeof(dgames) == "undefined") dgames = new Array();
var gmMenu = document.createElement('div');
gmMenu.id="sdc";
var html = "<h3><b>Dice Streaks</b></h3>";
gmMenu.innerHTML = html;
ul[0].parentNode.appendChild(gmMenu);
ul = document.createElement('ul');
ul.style.borderWidth = "1px 1px 0px 1px";
ul.style.width = "151px";
if(window.location.href.match(/game=(\d+)/)) var gid = parseInt(RegExp.$1); 	
if(gid && (dgames.indexOf(gid) != -1)) ul.innerHTML = "<li><a id=\"mydice\" href=\"javascript:void(0);\"><span>Game Dice Streaks</span></a></li>";
else ul.innerHTML = "<li><a id=\"mydice\" href=\"javascript:void(0);\"><span>All Dice Streaks</span></a></li>";
gmMenu.appendChild(ul);
ul = document.createElement('ul');
ul.style.borderWidth = "0px 1px 0px 1px";
ul.style.width = "151px";
ul.innerHTML = "<li><a id=\"cleardice\" href=\"javascript:void(0);\"><span>Reset</span></a></li>";
gmMenu.appendChild(ul);
document.getElementById('cleardice').addEventListener("click", function() {
if(confirm("Reset All Dice?")) {
dice = new Array();
dgames = new Array();
GM_setValue("dice", uneval(dice));
GM_setValue("recgame", uneval(dgames));
}
}, false);	
document.getElementById('mydice').addEventListener("click", function() {
	if(window.location.href.match(/game=(\d+)/)) var g = parseInt(RegExp.$1);
	openBox();
	if(g && (dgames.indexOf(g) != -1)) streak(g);
	else streak(0);
	viewer.document.getElementById('closeRank').style.opacity = "0.9";
	viewer.document.getElementById('closeRank').style.backgroundColor = "green";
}, false);

window.addEventListener("unload" , cleanup, false);
var handle = unsafeWindow.handleResponse;
unsafeWindow.handleResponse = function()
{
	var request = unsafeWindow.request;
	if (request.readyState == 4)
	{
		var elem = document.createElement("div");
		elem.innerHTML = request.responseText;
		var divs = elem.getElementsByTagName("div");
		for (var i = 0; i < divs.length; i++){
			if (divs[i].id == "rolls")
			{
				analyzeDiceRolls(divs[i]);
				break;
			}
		}
	}
	return handle();
}
}
}


