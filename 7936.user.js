// Travian GreaseMonkey Script
// Get GreaseMonkey @ http://greasemonkey.mozdev.org/
// Author: d0t
// Thanks To: Sariel Amraphel, Nick_S, S-Force, Parisii, Requiem for suggestions and contributions to code

//some parts based on the travissimo script Copyright (C) 2005 by blomi
// Released under the GNU GPL license ( http://www.gnu.org/copyleft/gpl.html)

// ==UserScript==
// @name          Travian
// @namespace     travian
// @description   Greasemonkey script for Travian
// @include http://travian.nl/*
// @include http://travian.com/*
// @include http://*.travian.com/*
// @include http://*.travian.nl/*
// @include http://80.64.143.66/*
// @include http://80.64.143.66*
// @include http://*.80.64.143.66*
// @exclude http://forum.travian.*
// @exclude http://*.travian.*/index.php*
// @exclude http://*.travian.*/anleitung.php*
// @exclude http://*.travian.*/login.php*
// @exclude http://*.travian.*/chat/*
// @exclude http://*.travian.*/impressum.php*
// @exclude http://*.travian.*/karte2.php*
// ==/UserScript==

///////////// SETTINGS ////////////////
var defaultAttType = 2;              // default attack type  :  2 = Reinforcement, 3 = Normal, 4 = Raid
var mapStep        = 3;              // how many squares the direction buttons on the map change the position
var disablePlusBtn = false;          // remove the 'plus' button in the top bar
var forumURL       = "www.google.be";
var travissimoimg = 'http://members.home.nl/mgdijkerman/Travian/travissimo/'; // url for some additional images
///////////////////////////////////////

function t_format2(s) { if(s > -1)  { stunden = Math.floor(s/3600); minuten = Math.floor(s/60) % 60;    sekunden = s % 60; t = stunden + ":"; if(minuten < 10){t += "0";} t += minuten + ":"; if(sekunden < 10){t += "0";} t += sekunden; }else{t = "0:00:0?";}return t;}
function t_format1(myElement) {p = myElement.innerHTML.split(":");stunden = p[0];minuten =  p[1];sekunden = p[2];sek = stunden*3600+minuten*60+sekunden*1;return sek;}
function addGlobalStyle(css) {    var head, style;    head = document.getElementsByTagName('head')[0];    if (!head) { return; }    style = document.createElement('style');    style.type = 'text/css';    style.innerHTML = css;    head.appendChild(style);}

var server = window.location.href.match(/(\w+).travian/)[1];
if((!server)||server=="www") server="nl";

function elem(tag,content) { var ret = document.createElement(tag);  ret.innerHTML = content;  return ret;}
function div(content)      { return elem("div",content);}

function get(id)      { return document.getElementById(id); }
function find(xpath,xpres) {
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE, XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function trim(s) { return s.replace(/^\s*(.*?)\s*$/,'$1');}
function pad2(n) { return n<10?"0"+n:n;}

function addBookmark(pr) {
  var bmtitle = prompt("Title for the bookmark?");
  if(pr) var loc =  prompt("URL of bookmark?");
  else   var loc = window.location.href
  if (bmtitle != null) {
     GM_setValue("bookmarks",GM_getValue("bookmarks","")+"|<>|"+ bmtitle + "@@@" + loc);
     window.location.reload( false );
  }
}
function removeBookmark(bookmark) {
  if(confirm("Remove Bookmark " + bookmark + "?")) GM_setValue("bookmarks",GM_getValue("bookmarks","").replace(bookmark,""));
  window.location.reload( false );
}

// hide vote image
try { find("//a[@href='http://www.gamesites200.com/mpog/vote.php?id=1904']",XPFirst).style.display = "none"; } catch(e) {}
try { find("//a[@href='http://www.oz-games200.com/in.php?gameid=378']",XPFirst).style.display = "none"; } catch(e) {}

// edit menu for bookmarks
var bmadd = elem("a","Add bookmark");
bmadd.addEventListener("click", function(){addBookmark(false);}, 0);
var bmadd2 = elem("a","Add External BM");
bmadd2.addEventListener("click", function(){addBookmark(true);}, 0);
var hr = document.createElement("hr");
hr.size=1; hr.color="#aaaaaa"; hr.style.marginLeft = "7px";

var menu = find("//td[@class='menu']",XPFirst);
if(menu) {
  menu.style.display = "none"; // tegen knipperen (?)
  menu.appendChild(hr);
  menu.appendChild(bmadd);
  menu.appendChild(bmadd2);
  menu.appendChild(hr.cloneNode(false));
  var rmbm = "<span style='position:absolute;left:0px;font:0.75em;padding-left:1px;cursor:crosshair'>x&nbsp;</span>";
  var bmarks = GM_getValue("bookmarks","").split("|<>|");
  for(var bm in bmarks) {
    bm = bmarks[bm];
    if(trim(bm)=="") continue;
	var bmdata = bm.split("@@@"), link = elem("a",rmbm + "<span>" + bmdata[0]+"</span>");
	link.style.paddingTop = 0; 	link.style.paddingBottom = 1;
    link.setAttribute('bm',bm);
    link.href = bmdata[1];
	link.firstChild.addEventListener("click", function(e) {removeBookmark(e.target.parentNode.getAttribute('bm'));return false;}, 0);
	ct = elem('span',''); ct.style.position = 'relative'; ct.appendChild(link);
	menu.appendChild(ct);
  }
  menu.style.display = "table-cell";
} // if menu

// timer
function timerStart(id) {
  var tmr = get(id);
  if(!tmr) return;
  tmr.start = new Date().getTime();
  tmr.sec   = t_format1(tmr);
  timerUpdate(tmr);
}
function timerUpdate(tmr) {
  var sec = tmr.sec - Math.floor( (new Date().getTime() - tmr.start) / 1000);
  if(sec < 0 && tmr.onzero) tmr.onzero();
  else {
    tmr.innerHTML = t_format2(sec);
    setTimeout(function(){timerUpdate(tmr);}, 500);
  }
}
// resources income

var rtd = [], prod = [], store = [], storeMax = [], secFull = [];
// find production, stored amount
for(var i=0;i<4;++i) {
  rtd[i]   = get("l"+(i+1));
  if(!rtd[i]) break;
  prod[i]  = parseInt(rtd[i].title);
  store[i] = parseInt(rtd[i].textContent.match(/\-?(\d+)\//));
  storeMax[i] = parseInt(rtd[i].textContent.replace(/(\d+)\//,""));  
  if(prod[i] > 0) {
    secFull[i] = (3600*(storeMax[i]-store[i])/prod[i]);
    var fullStr = t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3);
	if(store[i]==storeMax[i]) fullStr = "<b>" + fullStr + "</b>";
  }
  else if(prod[i] < 0) {
    secFull[i] = (3600*-store[i]/prod[i]);
    var fullStr = "<b>" +  t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3) + "</b>";
	if(secFull[i] < 8*3600) fullStr = "<span style='color:red'>" + fullStr + "</span>";
  } 
  else var fullStr = "??";
  var insCell = rtd[i].previousSibling.previousSibling;
  insCell.style.position = "relative";
  insCell.appendChild(elem("span","<span style='font-size:8pt;position: absolute;top:13px;'>(" +  (prod[i]<0?"":"+") + prod[i] + "," + fullStr +  ")</span>" ));
}

// build
if(window.location.href.match(/build\.php/)) {
  // for each resource listing...
  var tbls = find("//table[@class='f10']",XPList);
  for(var j=0;j<tbls.snapshotLength;++j) {
    var tbl = tbls.snapshotItem(j);
    var cell = tbl.rows[0].firstChild, cost = cell.textContent.split("|").splice(0,4) , hrs2go = 0,  lack = [], hrs = [];
    if(cost.length!=4) continue; // not a resource cost table
    for(var i=0;i<4;++i) {
      cost[i]  = parseInt(cost[i]);
	  lack[i] = cost[i]-store[i];
      hrs[i] = lack[i]/Math.max(1e-8,prod[i]);
      if (hrs2go < hrs[i]) {
        needed = i;
        hrs2go = hrs[i];
      }
    }
    if(hrs2go != 0) {
      var dateBuild = new Date(new Date().getTime()+hrs2go*3600000), timeBuild = pad2(dateBuild.getHours()) + ":" + pad2(dateBuild.getMinutes());
      var hrs2go = t_format2(Math.ceil(hrs2go*3600)), id = "timer"+j;
      var cell_html = '<table style="margin:5px 0px 3px 0px" cellspacing="1" cellpadding="2" class="tbg"><tr class="rbg"><td colspan="3">Resources needed</td></tr><tr><tr class="cbg1"><td>&nbsp;</td><td>Amount Needed</td><td>Time Needed</td></tr><tr>';
	  for(var i=0;i<4;++i) if(hrs[i]>0) cell_html += '<tr' +(i==needed?" style='font-weight:bold":"")+ '><td><img src="http://img.travian.org/img/en/r/'+(i+1)+'.gif"></td><td>'+lack[i]+'</td><td>'+t_format2(Math.ceil(hrs[i]*3600))+'</td></tr>';
	  cell_html += "</table>";
	  cell.appendChild(div(cell_html));
    }
  }

}

// main overview
function saveNotes() {
  GM_setValue(loc+"_notes",get('note').value);
  get('bn').value += " ... Notes Saved!";
  return false;
}

var noteHTML = div("<b>Notes:</b><textarea class='fm' style='width:100%;height:110px;' id='note'></te"+"xtarea><br><input type=button id='bn' value='Save Notes' class=fm style='width:100%;height:25px;margin-top:-3px;background:#eee;'>");
function addNoteHandler() {
 get('bn').addEventListener("click",function(){saveNotes();}, true);
}
if(window.location.href.match(/dorf1\.php/)) {
  var loc = server;
  noteHTML.style.margin = "0px 20px";
  document.body.appendChild(noteHTML);
  addNoteHandler();
  get('note').value = GM_getValue(loc+"_notes","");
}

//map
function inactivesCallback(ajaxreq) {
  var d = div("<div style='position:absolute;right:10px;top:250px;font:8pt Verdana !important;width: 300px;border: 1px solid #aaa;'>"+ajaxreq.responseText+'</div>');
  document.body.appendChild(d);
}

if(window.location.href.match(/karte2?\.php/) && mapStep!=1) {
  var westLink = find("//area[@title='West']",XPFirst);
  if(westLink) { // map view
	var loc = 1+parseInt(westLink.href.match(/z=(\d+)/)[1]), ts = ['West','East','North','South'], fac = [-1,1,-512,512];
	if(!find("//area[@title='East']",XPFirst)) ts = ['West','Oost','Noord','Zuid'];
	for(var i=0;i<4;++i) {
      var link = find("//area[@title='" + ts[i] + "']" ,XPFirst);
      link.href = link.href.replace(/z=(\d+)/,'z='+(loc+fac[i]*mapStep));
	}
	//var snr = server.slice(1);
   // if(server=="s1" || server=="s2") GM_xmlhttpRequest({method:'get',onload:inactivesCallback,url:'http://gottravian.philippinepics.com/inactives.php?pos='+loc+'&checkinactive=0&server='+snr});

  }//if map
  else { // province view
    var loc = window.location.href.match(/d=(\d+)/)[1];
	find("//div/font/table[@class='f10']",XPFirst).parentNode.appendChild(noteHTML);
    addNoteHandler();
    get('note').value = GM_getValue(loc+"_notes","");
  }
}
// attack type
if(window.location.href.match(/a2b\.php/)) {
  find("//input[@value='"+defaultAttType+"']",XPFirst).checked = true;
}
// messages
if(window.location.href.match(/berichte\.php/)) {
  try{
   var rescell = find("//tr[@class='cbg1']/td[@class='s7']",XPFirst);
   var x=document.getElementsByTagName("td"), attack = x[5].textContent, troops_kind = x[13].innerHTML;
   var res = trim(rescell.textContent).split(" "), total = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2]) + parseInt(res[3]);
  }catch(e){rescell=null; }
  if(rescell && (attack.indexOf("attacks") != -1 || attack.indexOf("aanvallen") != -1 || attack.indexOf("viel") != -1)) { // language-specific: village A "attacks" village B, this sets for dutch and english
	var tcarry = [0,0,0,0,0,0,0,0,0,0]; // troop names in next 3 lines possibly language-specific
	if(troops_kind.indexOf("Legionnair") != -1) var tcarry = [40,20,50,0,100,70,0,0,0,1600];
    if(troops_kind.indexOf("Clubswinger") != -1) var tcarry = [60,40,50,0,110,80,0,0,0,1600];
    if(troops_kind.indexOf("Phalanx") != -1)     var tcarry = [30,45,0,75,35,65,0,0,0,1600];  
	var total_carry = 0; // total_carry = sum (troops-losses * carry of troop type)
	for(var i=0;i<10;++i) total_carry += (parseInt(x[24+i].textContent) - parseInt(x[35+i].textContent)) * tcarry[i];
    if(total_carry != 0) rescell.appendChild(div("Total: " + total + "/" + total_carry + " [" + Math.round(total/total_carry*1000)/10 + "%]"  ));
  }
  else if(!isNaN(total)) rescell.appendChild(div("Total: " + total));
}
// warsim
if(window.location.href.match(/warsim\.php/)) {
  var btns = find("//input[@name='v2']",XPList);
  for(var i=0;i<3;++i) {
    var rbtn = btns.snapshotItem(i);
    if(!rbtn) break;
    rbtn.type = "checkbox";
    rbtn.name = rbtn.name + "" + rbtn.value;
    rbtn.value= 1;
  }
}

// travissimo functions, based on the travissimo script

function travissimo_igmlinks() { // add message and attack links
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++){
	var igmlink = null;
	if(links[i].href.search(/spieler.php\?uid=(\d+)/)>0) {
	  igmlink = elem('a',"<img src='"+travissimoimg+"igm.png' style='margin:3px 0px 1px 3px; display: inline' height=8 title='Send IGM' alt='Msg' border=0>");
	  igmlink.href = 'nachrichten.php?t=1&id='+RegExp.$1;
	}
	if (links[i].href.search(/karte.php\?d=(\d+$)/)>0){
	  igmlink = elem('a',"<img src='http://s1.travian.com/img/en/a/att_all.gif' style='margin:3px 0px 1px 3px; display: inline' height=10 width=10 title='Attack' alt='Att' border=0>");
	  igmlink.href = 'a2b.php?z='+RegExp.$1;
	}
	if(igmlink) {
	  if(links[i].hasAttribute('bm')) { // bookmark links
		igmlink.style.position = 'absolute'; igmlink.style.backgroundImage = 'none !important'; 
		igmlink.style.cursor = 'crosshair';		igmlink.style.padding = "0px";
		var c = links[i].childNodes[1];
 		igmlink.style.left = links[i].childNodes[1].offsetWidth + 12; 
		igmlink.style.top = -1;
		links[i].parentNodeappendChild
	  }
	  links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
	}
  }
}




function travissimo_kpberechnung(){ // first line is language-specific
  if (window.location.pathname == '/build.php' &&  window.location.search.indexOf('s=2')>=0 &&
	 (document.getElementsByTagName("h1")[0].innerHTML.indexOf("Pal")>=0 ||
      document.getElementsByTagName("h1")[0].innerHTML.indexOf("Resi")>=0)) {
	var b = document.getElementsByTagName('b'), prod = parseInt(b[2].innerHTML), stand= parseInt(b[3].innerHTML);
	var not = parseInt(b[4].innerHTML),  nd  = travissimo_kp2dorf(not);
	var text;

	if(not < stand){
	  var md = travissimo_kp2dorf(stand);
	  if (md == nd) text = 'You have enough points to found or conquer your <b>' + nrfmt(nd) +'</b> village.';
	  else   		text = 'You have enough points to found or conquer another '+nrfmt(md-nd+1)+' villages.';
 	} 
	else {
	  var sec = (not-stand)/prod*86400;
	  text = 'You need another <b>'+(not-stand)+'</b> points, ';
	  text = text+'enough points in <b>'+travissimo_sectodur(sec)+'</b>,  ('+travissimo_sectodate(sec) + ')';
	}
	var nxneeded = travissimo_dorf2kp(nd+1);
	var text2 = 'You can found or conquer another village in <b>'+(Math.ceil((nxneeded-stand)/prod))+'</b> day(s).<br>(<b>' + nxneeded + '</b> points needed)';
	b[4].parentNode.innerHTML = b[4].parentNode.innerHTML + '<p>'+text+'</p><p>'+text2+'</p>';
  }
}

function travissimo_sectodur(sec){ // seconds to days/hrs
  return (d=Math.floor(sec/86400))+' days and '+Math.floor((sec-86400*d)/3600)+' hours';
}
function travissimo_sectodate(sec){ // returns formatted date : now + sec
  var d = new Date((new Date()).getTime()+sec*1000);
  return d.getDate()+'.'+(d.getMonth() + 1)+' at '+d.getHours()+':'+d.getMinutes();
}
function travissimo_kp2dorf(kp){
  return Math.floor(Math.sqrt(kp/2000)+1);
}
function travissimo_dorf2kp(anz){
  return Math.pow(anz-1,2)*2000;
}
function nrfmt(n) { // 3 -> 3rd , 21 -> 21st etc.
  if(n%10==1) return n + "st";
  if(n%10==2) return n + "nd";
  if(n%10==3) return n + "rd";
  return n + "th";
}
function travissimo_marktsenden(){
  if (window.location.pathname == '/build.php' &&
	  window.location.search.indexOf('t') == -1 &&
	  document.getElementsByName('r1').length >= 1 &&
	  ((mc=find("//td[@colspan='2']",XPFirst).textContent).indexOf("Merchant")>=0 || mc.indexOf("hand")>=0)) {
	  
	  var f = document.getElementsByTagName('input');
	  var ex = f[5].parentNode.parentNode.parentNode;
	  ex.innerHTML = ex.innerHTML +
					'<tr><td colspan="2">Merchants</td><td id="travissimo_markttdh"></td></tr>'+
					'<tr><td colspan="2">Unused Capacity<br>Total Unused</td><td id="travissimo_markttdk"></td></tr>';

	  for (var i=0; i<4; i++){
  		f[i+2].addEventListener("change", travissimo_marktshowhandler, false);
		f[i+2].addEventListener("keyup", travissimo_marktshowhandler, false);
		f[i+2].addEventListener("move", travissimo_marktshowhandler, false);
	  }
	 var a = document.getElementsByTagName('table')[3].getElementsByTagName("a");
	 for (var i=0; i<a.length; i++)	a[i].addEventListener("mouseup", travissimo_marktshowhandler, false);
 	 for (var i=0; i<8; i++) f[i+2].tabIndex = (i+1);
 	 f[2].focus();
     travissimo_marktshowhandler();
  }
}
function travissimo_marktshowhandler(){
  var h = get('travissimo_markttdh'),k = get('travissimo_markttdk');
  var t = parseInt(document.getElementsByTagName('b')[4].innerHTML), f = document.getElementsByTagName('input');
  var l = 0, m = mc.match(/\d+/)[0]; // merchants: available/total
  for (var i=0; i<4; i++) l = l + parseInt(f[i+2].value);
  if (Math.ceil(l/t) > parseInt(m)) h.innerHTML = '<span style="color:red; font-weight:bold">'+Math.ceil(l/t)+'</span>';
  else                        	  h.innerHTML = Math.ceil(l/t);
  if(m*t-l < 0) k.innerHTML = "<span style=\"color:red; font-weight:bold\">-<br>" + m*t-l + "</span>";
  else          k.innerHTML =  "" + (Math.ceil(l/t)*t-l)  + "<br>" + (m*t-l);
}
travissimo_igmlinks();
travissimo_navigationbar();
travissimo_marktalli();
travissimo_kpberechnung();
travissimo_marktsenden();

addGlobalStyle('.rbg td {background-image: url(http://s1.travian.com/img/en/css/c2.gif);}  .menu a{padding-top:0px !important;padding-bottom:1px !important;} IMG[src="img/en/h/help.gif"],IMG[src="img//en/h/help.gif"] {display:none;} ');
