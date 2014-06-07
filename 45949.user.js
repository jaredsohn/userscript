//
// ==UserScript==
// @name          Conquer Club Assault Odds
// @namespace     http://userscripts.org/
// @description   Calculates available attack routes and odds
// @include       http*://*.conquerclub.com*/game.php*
// ==/UserScript==
// Copyright 2009-2012 chipv.freehostia.com
// All rights reserved

var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() );

var versiona = "1.0.4";
var latestVersiona = 0;
var cast = 1;
var display = 7;
var features=[];
var mapName = document.getElementById('outer-map').style.backgroundImage;
if(mapName.match(/conquerclub.com\/(.+?)\./)) {
mapName = RegExp.$1;
}
var logDiv = document.getElementById('log');
var dashboard = document.getElementById('dashboard');
var armiesarray = new Array();
var owners = new Array();
var path = new Array();
var conq = new Array();
var steps = new Array();
var bds = new Array();
var bmb = new Array();
var terr = new Array();
var copy = new Array();
var qcalcs = new Array();
var owner;
var proto;
var deploy = 0;
var qcalc = 1;
var cols = new Array('#000','#f00','#009a04','#00f','#cc0','#f0f','#0cc','#f92','#7f7f7f');
var attacking = {'11' : 15/36,'12' : 55/216, '21' : 125/216,'22' : 295/1296,'31' : 855/1296,'32' : 2890/7776};
var defending = {'11' : 21/36,'12' : 161/216,'21' : 91/216, '22' : 581/1296,'31' : 441/1296,'32' : 2275/7776};
var splitting = {'11' : 0,    '12' : 0,      '21' : 0,      '22' : 420/1296,'31' : 0,       '32' : 2611/7776};
var displays = new Array("Quick Calc", "Pathfinder", "Statistics");
var bombard = 0;
var Stack = [];
var Stats = [];
var compiled;
var qcomps = new Array();
var sref;
var map;

function Survived(size,blanks,duds) {
this._min = new Array(size);
for(var m=0; m<(size); m++) {
 this._min[m] = 0;
}
this._odds = 0;
this._blanks = blanks;
this._duds = duds;
}

function cleanup() {
Stack = null;
Stats = null;
}

function defence(des,deduct) {
    var newDefs = new Array();
    if(deduct > 0) newDefs[0] = des[0] - deduct;
     for(var i=1; i<des.length; i++) {
     newDefs.push(des[i]);
	}
	return newDefs;    
}

function formatOdds(odds) {
var prob = odds;
if(!cast) prob = (100 * prob).toFixed(1) + "%";
return prob;
}

   
function bubble(parent,ab,dbs,dc,rm) {
var sv = checkStackStats(ab,dbs,dc,rm);	
parent._odds += sv._odds * dc;
for(var y=0; y<sv._min.length;y++) {
 parent._min[y] += dc * sv._min[y];
}
}

function bubbled(parent,abs,dbs,dc,rm) {
var sv = checkStackedStats(abs,dbs,dc,rm);	
parent._odds += sv._odds * dc;
for(var y=0; y<sv._min.length;y++) {
 parent._min[y] += dc * sv._min[y];
}
}

function checkStack(f,c,d) {
 if(Stack[f] && Stack[f][c.toString()]) return (d * Stack[f][c.toString()]);
 else return (d * conquest(f,c));
}

function checkStacked(f,c,d) {
 if(Stack[f.toString()] && Stack[f.toString()][c.toString()]) return (d * Stack[f.toString()][c.toString()]);
 else return (d * overwhelm(f,c));
}

function checkStackStats(f,c,d,r) {
 if(Stats[f] && Stats[f][c.toString()]) return (Stats[f][c.toString()]);
 else return (conquestStats(f,c,r));
}

function checkStackedStats(f,c,d,r) {
 if(Stats[f.toString()] && Stats[f.toString()][c.toString()]) return (Stats[f.toString()][c.toString()]);
 else return (overwhelmStats(f,c,r));
}

function conquest(a,ds) {
if(!Stack[a]) Stack[a] = new Array();
var d = ds[0];
var ad = (a>4)? 3:a-1;
var dd = (d>1)?2:d;
var dice = ad + '' + dd;
var loss = (ad<dd)? ad:dd;
var a1 = 0;
if(loss){
 if(a - loss > ds.length) a1 += checkStack(a-loss,ds,defending[dice]);
 if(d == loss) {
  if(ds.length == 1) a1 += attacking[dice];
  else a1 += checkStack(a-1,defence(ds,0),attacking[dice]);
 }
 else a1 += checkStack(a,defence(ds,loss),attacking[dice]);
 if(splitting[dice] && (a-1 > ds.length)) a1 += checkStack(a-1,defence(ds,1),splitting[dice]);
}
Stack[a][ds.toString()] = a1;
return a1;
}

function overwhelm(as,ds) {
if(!Stack[as.toString()]) Stack[as.toString()] = new Array();
var a = as[0];
var d = ds[0];
var ad = (a>4)? 3:a-1;
var dd = (d>1)?2:d;
var dice = ad + '' + dd;
var loss = (ad<dd)? ad:dd;
var a1 = 0;
if(loss) {
	if(a -1 == loss) {
		if(as.length == 2) a1 += checkStack(as[1],ds,defending[dice]) 
		else a1 += checkStacked(defence(as,0),ds,defending[dice]);
	}
	else a1 += checkStacked(defence(as,loss),ds,defending[dice]);
	if(d == loss) {
	 if(ds.length == 1) a1 += attacking[dice];
	 else a1 += checkStack(a - 1,defence(ds,0),attacking[dice]);
	}
	else a1 += checkStacked(as,defence(ds,loss),attacking[dice]);
  if(splitting[dice]) {
   if(a>2) a1 += checkStacked(defence(as,1),defence(ds,1),splitting[dice]);
   else {
	   if(as.length == 2) a1 += checkStack(as[1],defence(ds,1),splitting[dice]); 
	   else a1 += checkStacked(defence(as,0),defence(ds,1),splitting[dice]);
   }
	}
}
Stack[as.toString()][ds.toString()] = a1;
return a1;		
}

function conquestStats(a,ds,rem) {
if(!Stats[a]) Stats[a] = new Array();
if(!Stats[a][ds.toString()]) Stats[a][ds.toString()] = new Survived(a+rem,ds.length,1); 
var d = ds[0];
var ad = (a>4)? 3:a-1;
var dd = (d>1)?2:d;
var dice = ad + '' + dd;
var loss = (ad<dd)? ad:dd;
if(loss){
 if(a - loss > ds.length) bubble(Stats[a][ds.toString()],a-loss,ds,defending[dice],rem);
 if(d == loss) {
  if(ds.length == 1) {
   Stats[a][ds.toString()]._odds += attacking[dice];
   for(var y=0;y<a+rem; y++) {
    Stats[a][ds.toString()]._min[y] += attacking[dice];
   }	 
  }
  else bubble(Stats[a][ds.toString()],a-1,defence(ds,0),attacking[dice],rem+1);
 }
 else bubble(Stats[a][ds.toString()],a,defence(ds,loss),attacking[dice],rem);
 if(splitting[dice] && (a-1 > ds.length)) bubble(Stats[a][ds.toString()],a-1,defence(ds,1),splitting[dice],rem);
}
return Stats[a][ds.toString()];
}

function overwhelmStats(as,ds,rem) {
if(!Stats[as.toString()]) Stats[as.toString()] = new Array();
var atot=0;
for(var cb=0; cb<as.length; cb++) {
 atot += as[cb];
}
if(!Stats[as.toString()][ds.toString()]) Stats[as.toString()][ds.toString()] = new Survived(atot + rem,ds.length,as.length); 
var a = as[0];
var d = ds[0];
var ad = (a>4)? 3:a-1;
var dd = (d>1)?2:d;
var dice = ad + '' + dd;
var loss = (ad<dd)? ad:dd;
if(loss) {
	if(a -1 == loss) {
		if(as.length == 2) bubble(Stats[as.toString()][ds.toString()],as[1],ds,defending[dice],rem+1);
		else bubbled(Stats[as.toString()][ds.toString()],defence(as,0),ds,defending[dice],rem+1);
	}
	else bubbled(Stats[as.toString()][ds.toString()],defence(as,loss),ds,defending[dice],rem);
	if(d == loss) {
	 if(ds.length == 1) {
      Stats[as.toString()][ds.toString()]._odds += attacking[dice];
      for(var y=0;y<atot+rem; y++) {
       Stats[as.toString()][ds.toString()]._min[y] += attacking[dice];
	  }	 
	 }
	 else bubble(Stats[as.toString()][ds.toString()],a-1,defence(ds,0),attacking[dice],rem +1 + atot - a);
	}
	else bubbled(Stats[as.toString()][ds.toString()],as,defence(ds,loss),attacking[dice],rem);
    if(splitting[dice]) {
     if(a>2) bubbled(Stats[as.toString()][ds.toString()],defence(as,1),defence(ds,1),splitting[dice],rem);
     else {
	  if(as.length == 2) bubble(Stats[as.toString()][ds.toString()],as[1],defence(ds,1),splitting[dice],rem+1);
	  else bubbled(Stats[as.toString()][ds.toString()],defence(as,0),defence(ds,1),splitting[dice],rem+1);
     }
	}
}
return Stats[as.toString()][ds.toString()];		
}


function addSelect(tid,eid) {
if(tid) {	
 var pid = parseInt(eid.split('i')[1]);
 path = path.splice(0,pid);
 path.push(terr[tid]);
 setTable();
}
}

function addPath(ind) {
if(ind) {
 var opp = new Array();
 for(var s=1; s<steps.length; s++) {
  opp.push(armiesarray[steps[s]]);
 }
 var prob;
 if(display & (1 << 2)) {
	 compiled = checkStackStats(armiesarray[path[0]] + deploy, opp,1,0);
	 prob = formatOdds(compiled._odds);
 }
 else prob = formatOdds(checkStack(armiesarray[path[0]] + deploy, opp,1));
 html = "<td><span class=\"player" + owners[path[ind]] + "\">" + path[ind] + " (" + armiesarray[path[ind]] + ")</span></td><td>" + prob + "</td></tr>";
}
else	
html = "<td><span class=\"player" + owners[path[0]] + "\">" + path[0] + " (" + (armiesarray[path[0]] + deploy) + ")</span></td><td>&nbsp;</td></tr>";
if(bombard) {
html += "<tr><td>&nbsp;</td><td>No More Attacks</td>";
return html;
}
var uihtml = "<tr><td>&nbsp;</td><td><select id=\"ui" + (ind + 1) + "\"><option value=\"\">To</option>";
var valid = 0;
bds[path[ind]].sort();
for(var d=0; d<bds[path[ind]].length; d++) {
 if(steps.indexOf(bds[path[ind]][d]) == -1 && owners[bds[path[ind]][d]] != owner) {
  var sel = (path.length > ind && bds[path[ind]][d] == path[ind+1]) ? ' selected' : ''; 
  uihtml += "<option" + sel + " style=\"font-weight:bold;color:" +  cols[owners[bds[path[ind]][d]]] + "\" value=\"" + terr.indexOf(bds[path[ind]][d]) + "\">" + bds[path[ind]][d] + " (" + armiesarray[bds[path[ind]][d]] + ")</option>"; 
  valid++;
 }  
}
bmb[path[ind]].sort();
for(var d=0; d<bmb[path[ind]].length; d++) {
 if(steps.indexOf(bmb[path[ind]][d]) == -1 && owners[bmb[path[ind]][d]] != owner) {
  var sel = (path.length > ind && bmb[path[ind]][d] == path[ind+1]) ? ' selected' : ''; 
  uihtml += "<option" + sel + " style=\"font-weight:bold;color:" +  cols[owners[bmb[path[ind]][d]]] + "\" value=\"" + terr.indexOf(bmb[path[ind]][d]) + "\">" + bmb[path[ind]][d] + " (" + armiesarray[bmb[path[ind]][d]] + ")</option>"; 
  valid++;
  if(sel != '') bombard = 1;
 }  
}
if(valid)html += uihtml + "</select></td>";
else html += "<tr><td>&nbsp;</td><td>No More Attacks</td>";
return html;
}

function showHide() {
for(var t=0; t<displays.length; t++) {
document.getElementById('dispdiv' + t).style.display = ((display & (1<<t)) ? "" : "none");
}
}

function getArmies() {
owners = new Array();
armiesarray = new Array();
var armies;
var spread = document.getElementById('armies').innerHTML;
if(spread) {
	armies = eval("(" + spread + ")");
	for(var a=0; a<armies.length;a++) {
		owners[terr[a]] = parseInt(armies[a]["player"]);
		var q = parseInt(armies[a]["quantity"]);
		armiesarray[terr[a]] = (q==-1)? 0: q;
	}	
}
else{
var s = document.getElementsByTagName('script');
for(var sx=0; sx<s.length; sx++) {
	if(s[sx].innerHTML.match(/armies = (.+?);/)) {
		armies = eval("(" + RegExp.$1 + ")");
		for(var a=0; a<armies.length;a++) {
			owners[terr[a]] = parseInt(armies[a]["player"]);
			var q = parseInt(armies[a]["quantity"]);
			armiesarray[terr[a]] = (q==-1)? 0: q;
		}	
	}
}	
}
}

function setStats() {
var shtml = "<table class=\"listing\" border=\"1\" rules=\"all\"><thead><tr><th colspan=\"3\">Statistics</th></tr></thead><tbody><tr><td># Surviving Attackers</td><td>Exactly This # Survive</td><td>Minimum This # Survive</td></tr>";
var exact,rc;
if(compiled) {
for(var s=(compiled._blanks + compiled._duds - 1); s<compiled._min.length - 1; s++) {
exact = compiled._min[s] - compiled._min[s+1];	
rc = (s & 1) ? "<tr class=\"odd\">" : "<tr class=\"even\">";
shtml += rc + "<td>" + (s+1) + "</td><td>" + formatOdds(exact) + "</td><td>" + formatOdds(compiled._min[s]) + "</td></tr>";
}
rc = ((compiled._min.length-1) & 1) ? "<tr class=\"odd\">" : "<tr class=\"even\">";
shtml += rc + "<td>" + (compiled._min.length) + "</td><td>" + formatOdds(compiled._min[compiled._min.length-1]) + "</td><td>" + formatOdds(compiled._min[compiled._min.length-1]) + "</td></tr>";
shtml += "</tbody></table>";
}
document.getElementById('dispdiv2').innerHTML = shtml;
}

function validateQcalc(name,id,min) {
	var qc = document.getElementById(id);
  var dstring = qc.value.split(',');
	var pint = new Array();
	for(var g=0; g<dstring.length;g++) {
		pint[g] = parseInt(dstring[g]);
		 if(isNaN(pint[g]) || pint[g] < min) {
		   pint = new Array();
		   break;
		}
	}
	if(!pint.length) {	
		qc.value = '';
	  alert(name + " armies must be one or more numbers > " + (min - 1) + " separated by commas");
	}
	return pint;
}

function setTable() {
var thtml = "<div id=\"dispdiv0\"><table class=\"listing\" border=\"1\" rules=\"rows\"><thead><tr><th colspan=\"4\">Quick Calc</th></tr></thead><tbody>";
var valt = '&nbsp;';
if(document.getElementById('qtotal')) valt = document.getElementById('qtotal').innerHTML;
for(var q=0; q<qcalc; q++) {
var vala = '';	
var vald = '';
var valq = '&nbsp;';	
if(document.getElementById('qatt' + q) && document.getElementById('qatt' + q).value) vala = " value=\"" + document.getElementById('qatt' + q).value + "\" ";
if(document.getElementById('qdef' + q) && document.getElementById('qdef' + q).value) vald = " value=\"" + document.getElementById('qdef' + q).value + "\" ";
if(document.getElementById('quick' + q)) valq = document.getElementById('quick' + q).innerHTML;
thtml += "<tr><td>Attackers&nbsp;<input size=\"5\" id=\"qatt" + q + "\" width=\"100px\" type=\"text\" " + vala + "/></td><td>Defenders&nbsp;<input id=\"qdef" + q + "\" type=\"text\" size=10 " + vald + "/></td>";
thtml += "<td><input id=\"calc" + q + "\" type=\"button\" value=\"Odds\"/></td><td width=\"150px\" id=\"quick" + q + "\">" + valq + "</td></tr>";
}
thtml += "<tr><td><input type=\"button\" value=\"Add Calc\" id=\"qadd\" /></td><td><b style=\"font-size:10px\">Separate attacker/defender numbers with commas</b></td><td>Total: </td><td id=\"qtotal\">" + valt + "</td></tr></tbody></table></div>";
thtml += "<div id=\"dispdiv1\"><table class=\"listing\" border=\"1\" rules=\"all\"><thead><tr><th colspan=\"5\">Pathfinder</th></tr></thead><tbody><tr><td>Deploy</td><td>Territory</td><td style=\"width:200px;\">Attack Path</td><td style=\"width:100px;\">Odds</td><td>&nbsp;</td></tr>";
thtml +=  "<tr><td><input size=\"5\" id=\"deploy\" type=text value=\"" + deploy + "\" /></td><td><select style=\"width:200px;\" id=\"ui0\"><option value=\"\">From</option>";
for(var d=0; d<copy.length; d++) {
 if(owners[copy[d]] > 0) {   
  var sel = (path.length && copy[d] == path[0]) ? ' selected' : ''; 
  thtml += "<option" + sel + " style=\"font-weight:bold;color:" +  cols[owners[copy[d]]] + "\" value=\"" + terr.indexOf(copy[d]) + "\">" + copy[d] + " (" + armiesarray[copy[d]] + ")</option>"; 
 }
}         
thtml += "</select></td>";
if(path.length) owner = owners[path[0]];
steps = new Array();
bombard = 0;
for(var p=0; p<path.length; p++) {
 steps.push(path[p]);	
 thtml +=addPath(p);
}
thtml += "<td>&nbsp;</td><td>&nbsp;</td><td><input type=\"button\" id=\"pref\" value=\"Refresh\" /></td></tr></tbody></table></div>";
thtml += "<div id=\"dispdiv2\"></div>";
document.getElementById('assault').innerHTML = "<H3>Assault Odds</H3>" + thtml;
setStats();
document.getElementById('ui0').addEventListener('change', function() {
 addSelect(this.options[this.selectedIndex].value, this.id);  
}
, true);
document.getElementById('pref').addEventListener('click', function() {
getArmies();
if(owners[path[0]] == owner) {
	var valid = 1;
	var last = 0;
	for(var f=1; f<path.length; f++) {
	  if(owners[path[f]] == owner && owners[path[f-1]] != owner) {
		  valid = 0;
		  break;
	  }
	  if(owners[path[f]] == owner) last = f;
	}
	if(valid) {
		if(last > 0) {
		  for(var r=0; r<last; r++) {
		    path.shift();
			}
		}
	}
	else path = new Array();
}
else path = new Array();
setTable();
}
, true);
document.getElementById('deploy').addEventListener('change', function() {
  if(isNaN(this.value)) this.value = 0; 
  deploy = parseInt(this.value);
  getArmies();
  setTable();
}
, true);
document.getElementById('qadd').addEventListener('click', function() {
  qcalc++;
	setTable();
}
, true);
for(q=0; q<qcalc; q++) {
document.getElementById('qatt' + q).addEventListener('keypress', function(event) {
  event.stopPropagation();
}
, false);
document.getElementById('qatt' + q).addEventListener('keyup', function(event) {
  event.stopPropagation();
}
, false);	
document.getElementById('qdef' + q).addEventListener('keypress', function(event) {
  event.stopPropagation();
}
, false);
document.getElementById('qdef' + q).addEventListener('keyup', function(event) {
  event.stopPropagation();
}
, false);	
document.getElementById('calc' + q).addEventListener('click', function() {
  var ind = this.id.split('alc')[1];
	var aint = validateQcalc("Attacking", 'qatt' + ind,2);
	var dint = validateQcalc("Defending", 'qdef' + ind,1);
	if(aint.length && dint.length){
	 var total = 1;
   if(aint.length == 1) {
		 if(display & (1<<2)) {
			 compiled = checkStackStats(aint[0],dint,1,0)
       qcalcs[ind] = compiled._odds;
		 }
		 else qcalcs[ind] = (checkStack(aint[0],dint,1));
	 }
	 else {
		 if(display & (1<<2)) {
			 compiled = checkStackedStats(aint,dint,1,0)
       qcalcs[ind] = compiled._odds;
		 }		 
		 else qcalcs[ind] = (checkStacked(aint,dint,1));
	 }
	 for(var qr=0; qr<qcalc; qr++) {
	  total *= qcalcs[qr];
	 } 	 
	 document.getElementById('quick' + ind).innerHTML = formatOdds(qcalcs[ind]);
	 document.getElementById('qtotal').innerHTML = formatOdds(total);
	 setStats();
  }
	else document.getElementById('quick' + ind).innerHTML = '';	
}
, true);
}

for(p=1;p<path.length+1;p++) {
 if(document.getElementById('ui' + p)) {
 document.getElementById('ui' + p).addEventListener('change', function() {
  addSelect(this.options[this.selectedIndex].value, this.id);  
 }
, true);
}
}
showHide();
}

function showMenu() {
var gmMenu = document.createElement('div');
gmMenu.id="ass";
var html = "<h3><b>Assault Odds <span style='font-size:7pt;' ><a href='" + proto + "//www.conquerclub.com/forum/viewtopic.php?f=59&t=83451'>" + versiona + "</a></span></b></h3>";
gmMenu.innerHTML = html;
ul[0].parentNode.appendChild(gmMenu);
ul = document.createElement ('ul');
ul.style.borderWidth = "1px 1px 0px 1px";
ul.style.width = "151px";
var inner = "<li><a href=\"javascript:void(0);\" onclick=\"document.getElementById('castopt').style.display=(document.getElementById('castopt').style.display == ''? 'none':'');\"><span>Options</span></a></li>";
inner += "<div id=\"castopt\" style=\"display:none\">";
inner+= "<b>Format</b><br />";
inner += "<input id=\"casting1\" type=\"radio\" name=\"casting\"" + ((cast)? " checked":"") + ">Decimal<br />";
inner += "<input id=\"casting2\" type=\"radio\" name=\"casting\"" + ((cast)? "":" checked") + ">Percentage<br />";
inner += "<li></li><b>Display</b><br />";
for(var t=0; t<displays.length; t++) {
inner += "<input id=\"disp" + t + "\" type=\"checkbox\" value=\"" + t + "\"" + ((display & (1<<t)) ? " checked":"") + " />" + displays[t] + "<br />";
}
inner += "</div>";
ul.innerHTML = inner;
gmMenu.appendChild(ul);
document.getElementById('casting1').addEventListener("click" , function () {
cast = (this.checked == true)? 1:0;
GM_setValue('cast',cast);
}, true);
document.getElementById('casting2').addEventListener("click" , function () {
cast = (this.checked == true)? 0:1;
GM_setValue('cast',cast);
}, true);
for(var t=0; t<displays.length; t++) {
document.getElementById('disp' + t).addEventListener("click" , function () {
for (var u=0; u< displays.length; u++){
if (document.getElementById('disp' + u).checked==true)
display |= 1 << document.getElementById('disp' + u).value;
else
display &= ~( 1 << document.getElementById('disp' + u).value);
}
GM_setValue('display',display);
showHide();
}, true);
}
ul = document.createElement('ul');
ul.style.borderWidth = "0px 1px 0px 1px";
ul.style.width = "151px";
if(!is_chrome) {
	sref = "http://userscripts.org/scripts/source/45949.user.js";
if(latestVersiona) {
 ul.innerHTML = "<li><a id=\"alatest\" href=" + sref + "><span class=\"attention\">New Update Available</span></a></li>";
 gmMenu.appendChild(ul);
}
else{
 ul.innerHTML = "<li><a id=\"alatest\" href=" + sref + "><span>Latest Version Installed</span></a></li>";
 gmMenu.appendChild(ul);
}
var ftext = features.join("\n");
document.getElementById('alatest').addEventListener("click" , function () {
 alert('New version features\n' + ftext);
},true);
}
}


var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
proto = window.location.protocol;
if(!is_chrome) {
var ct = GM_getValue('cast');
if(typeof(ct) == "undefined") GM_setValue('cast',cast);
else cast = ct;
var dp = GM_getValue('display');
if(typeof(dp) == "undefined") GM_setValue('display',display);
else display = dp;
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://www.fileden.com/files/2008/5/8/1902058/assault.txt?nocache=' + Math.random(),
  headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
  },
  onload: function(responseDetails) {
      features = responseDetails.responseText.split('\n');
      var latest = features[0].split('.');
      var ver = versiona.split('.');
      latestVersiona = (((parseInt(latest[0]) * 100) + (parseInt(latest[1]) * 10) + parseInt(latest[2])) > ((parseInt(ver[0]) * 100) + (parseInt(ver[1]) * 10) + parseInt(ver[2])));
      showMenu();
  }
});
}
else{
	showMenu();
}
}
}

GM_addStyle("#assault table {background-color:#eee} #assault table {font-weight:bold;text-align:center}");
GM_addStyle("#dispdiv0 table,#dispdiv1 table,#dispdiv2 table {height:50px;width:650px} #assault select {width:200px} #dispdiv1 input {valign:middle}");
window.addEventListener("unload" , cleanup, false);
if(document.getElementById('action-form')) {	
var s = document.getElementsByTagName('script');
for(var sx=0; sx<s.length; sx++) {
	if(s[sx].innerHTML.match(/map = (.+?);/)) {
	map = eval("(" + RegExp.$1 + ")");
	for(var a=0; a<map["countries"].length;a++) {
		terr.push(map["countries"][a]["name"]);
	}	
	for(var a=0; a<map["countries"].length;a++) {
		var name = map["countries"][a]["name"];
		bds[name] = new Array();
		bmb[name] = new Array();
		for(var j=0; j<map["countries"][a]["borders"].length; j++) {
			bds[name].push(terr[map["countries"][a]["borders"][j]]);			
		}
		for(var j=0; j<map["countries"][a]["bombardments"].length; j++) {
			bmb[name].push(terr[map["countries"][a]["bombardments"][j]]);
		}
	}
	copy = terr.slice();
  copy.sort();
  getArmies();
  var div = document.createElement('div');
	div.id = "assault";
	div.innerHTML = "<H3>Assault Odds</H3>";
  dashboard.parentNode.insertBefore(div, document.getElementById('action-form').nextSibling);
  setTable();	
  break;
	}
}
}

