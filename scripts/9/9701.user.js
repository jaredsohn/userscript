// Travian GreaseMonkey Script
// Get GreaseMonkey @ http://greasemonkey.mozdev.org/
// Author: teutonix
// Thanks To: d0t for the original script
// (d0t) Thanks To: Sariel Amraphel, Nick_S, S-Force, Parisii, Requiem for suggestions and contributions to code

// (d0t comments)
//some parts based on the travissimo script Copyright (C) 2005 by blomi
// Released under the GNU GPL license ( http://www.gnu.org/copyleft/gpl.html)

// (my comments)
// this is mainly d0t's (or blomi's) code, I just made a few changes which I will mention so I don't take credit for their work:
// - Code changes so it would work in Version 3 servers, with and without ads
// -- These changes were: market resource sending, raid reports and map stepping
// - With a negative crop production, remaining hours will be calculated and "??" will only appear if production is 0
// - Raid reports will be well presented with or without hero present in the attack
// - Added a "select all" button in Reports and Messages pages, just like Plus! has
// - Inspired in Santiago E. Reil's Beautyfier user script, I've added links to send resources or troops to each own village

// ==UserScript==
// @name          Travian
// @namespace     travian
// @description   Greasemonkey script for Travian
// @include http://travian.com/*
// @include http://*.travian.com/*
// @include http://travian.nl/*
// @include http://*.travian.nl/*
// @exclude http://forum.travian.*
// @exclude http://*.travian.*/index.php*
// @exclude http://*.travian.*/anleitung.php*
// @exclude http://*.travian.*/login.php*
// @exclude http://*.travian.*/chat/*
// @exclude http://*.travian.*/impressum.php*
// @exclude http://*.travian.*/karte2.php*
// ==/UserScript==

///////////// SETTINGS ////////////////
var defaultAttType = 4;              // default attack type  :  2 = Reinforcement, 3 = Normal, 4 = Raid
var mapStep        = 3;              // how many squares the direction buttons on the map change the position
var disablePlusBtn = true;          // remove the 'plus' button in the top bar
var forumURL       = "http://mortalita.forumup.nl/";
///////////////////////////////////////

var hasAd      = true;
var eInd      = 0;

teutonix_hasHad();
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
   link.style.paddingTop = 0;    link.style.paddingBottom = 1;
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
  store[i] = parseInt(rtd[i].textContent.match(/(\d+)\//));
  storeMax[i] = parseInt(rtd[i].textContent.replace(/(\d+)\//,"")); 
  if(prod[i] > 0) {
    secFull[i] = (3600*(storeMax[i]-store[i])/prod[i]);
    var fullStr = t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3);
   if(store[i]==storeMax[i]) fullStr = "<b>" + fullStr + "</b>";
  }
  else if (prod[i] < 0) {
    secFull[i] = (3600*(store[i])/prod[i]) * -1;
    var fullStr = t_format2(Math.ceil(Math.max(0,secFull[i]))).slice(0,-3);
        fullStr = "<b>" + fullStr + "</b>";        
  }
  else  var fullStr = "??";
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
   var loc = 1+parseInt(westLink.href.match(/z=(\d+)/)[1]), ts = ['West','East','North','South'], fac = [-1,1,-801,801];
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
if(window.location.href.match(/nachrichten\.php/)) {
  try{
   var msgcell = find("//input[@value='delete']",XPFirst).parentNode.parentNode.childNodes[1];
  }catch(e) { msgcell = null; }
  if ((msgcell) && (!get('s10'))){
      var sallbox = document.createElement('input');
      sallbox.type = "checkbox";
      sallbox.id = "s10";
      sallbox.addEventListener("click", teutonix_selall, false);
      msgcell.appendChild(sallbox);
  }
}
if(window.location.href.match(/berichte\.php/)) {
  try{
   var msgcell = find("//input[@value='delete']",XPFirst).parentNode;
  }catch(e) { msgcell = null; }
  if ((msgcell) && (!get('s10'))) {
      
      var sallbox = document.createElement('input');
      sallbox.type = "checkbox";
      sallbox.id = "s10";
      sallbox.addEventListener("click", teutonix_selall, false);
      msgcell.appendChild(sallbox);
  }
  try{
   var rescell = find("//tr[@class='cbg1']/td[@class='s7']",XPFirst);
   var x=document.getElementsByTagName("td"), attack = x[5+eInd].textContent, troops_kind = x[13+eInd].innerHTML;
   var res = trim(rescell.textContent).split(" "), total = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2]) + parseInt(res[3]);
  }catch(e){rescell=null; }
  if(rescell && (attack.indexOf("attacks") != -1 || attack.indexOf("aanvallen") != -1)) { // language-specific: village A "attacks" village B, this sets for dutch and english
   var tcarry = [0,0,0,0,0,0,0,0,0,0,0]; // troop names in next 3 lines possibly language-specific
   if(troops_kind.indexOf("Legionnair") != -1) var tcarry = [40,20,50,0,100,70,0,0,0,1600,0];
    if(troops_kind.indexOf("Clubswinger") != -1) var tcarry = [60,40,50,0,110,80,0,0,0,1600,0];
    if(troops_kind.indexOf("Phalanx") != -1)     var tcarry = [30,45,0,75,35,65,0,0,0,1600,0]; 
   var total_carry = 0; // total_carry = sum (troops-losses * carry of troop type)
   var ind1=24+eInd;
   var ind2=35+eInd;
   if ((x[24+eInd].textContent).indexOf("Troops") != -1) {
      ind1 += 1;
      ind2 += 2;
      }
   for(var i=0;i<10;++i) total_carry += (parseInt(x[ind1+i].textContent) - parseInt(x[ind2+i].textContent)) * tcarry[i];
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
var travissimoimg = 'http://wuw.stusta.mhn.de/~u002024a/travissimo/img/';

function travissimo_igmlinks() { // add message and attack links
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++){
   var igmlink = null;
   if(links[i].href.search(/spieler.php\?uid=(\d+)/)>0) {
     igmlink = elem('a',"<img src='http://www.starkie.nl/travian/monkey/igm.png' style='margin:3px 0px 1px 3px; display: inline' height=8 title='Send IGM' alt='Msg' border=0>");
     igmlink.href = 'nachrichten.php?t=1&id='+RegExp.$1;
   }
   if (links[i].href.search(/karte.php\?d=(\d+$)/)>0){
     igmlink = elem('a',"<img src='http://www.starkie.nl/travian/monkey/att_all.gif' style='margin:3px 0px 1px 3px; display: inline' height=10 width=10 title='Attack' alt='Att' border=0>");
     igmlink.href = 'a2b.php?z='+RegExp.$1;
   }
   if(igmlink) {
     if(links[i].hasAttribute('bm')) { // bookmark links
      igmlink.style.position = 'absolute'; igmlink.style.backgroundImage = 'none !important';
      igmlink.style.cursor = 'crosshair';      igmlink.style.padding = "0px";
      var c = links[i].childNodes[1];
       igmlink.style.left = links[i].childNodes[1].offsetWidth + 12;
      igmlink.style.top = -1;
      links[i].parentNodeappendChild
     }
     links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
   }
  }
}


function travissimo_navigationbar(){
   var n = find("//div[@class='div2']",XPFirst); // works better than divs[4]
   var n2 = find("//map[@name='nb']",XPFirst);
   //n.style.textAlign = 'left';
   n.style.paddingLeft = 70; n.style.width = 900;
   var p = find("//div[@class='plus']",XPFirst);
   if(disablePlusBtn) p.style.display = 'none';
   else {p.style.left = 850;}
   /* Markettplace */   
   var marktmap = elem('map','<area shape=rect coords="0, 0, 70, 50"    href="build.php?gid=17"     title="Market: Send">' +
                       '<area shape=rect coords="0, 50, 35, 100"  href="build.php?gid=17&t=1" title="Market: Buy">'  +
                       '<area shape=rect coords="35, 50, 70, 100" href="build.php?gid=17&t=2" title="Market: Sell">' );
   marktmap.name = 'markt';

   var marktimg = document.createElement('img');
   marktimg.src = 'http://mijnkopthee.nl/travian/markt.png';
   marktimg.width = 70;    marktimg.height = 100;   marktimg.border = 0;
   marktimg.setAttribute('usemap', '#markt');
   marktimg.style.marginLeft = 50;
   n2.appendChild(marktmap);
   n.appendChild(marktimg);
   /* Military  */
   var milimap =  elem('map','<area shape=rect coords="0, 0, 35, 50"    href="build.php?gid=16"  title="Rally Point">' +
                       '<area shape=rect coords="35, 0, 70, 50"   href="build.php?gid=19"  title="Barracks">'    +
                       '<area shape=rect coords="0, 50, 35, 100" href="build.php?gid=20" title="Stable">'  +
                       '<area shape=rect coords="35, 50, 70, 100"   href="build.php?gid=21"  title="Workshop">');
    milimap.setAttribute('name', 'mili');

   var miliimg = document.createElement('img');
   miliimg.src = 'http://mijnkopthee.nl/travian/mili.png';
   miliimg.width = 70;    miliimg.height = 100;   miliimg.border=0;
   miliimg.setAttribute('usemap', '#mili');

   n2.appendChild(milimap);
   n.appendChild(miliimg);
   
   /* Alliance */
   var allimap = elem('map','<area shape=rect coords="0, 0, 35, 100"    href="allianz.php?s=3"     title="Alliance Attacks">' +
                       '<area shape=rect coords="35, 0, 70, 100"  href="'+forumURL+'"     title="Alliance Forum">' );
    allimap.setAttribute('name', 'alli');

   var alliimg = document.createElement('img');
   alliimg.src = 'http://mijnkopthee.nl/travian/alli.png';
   alliimg.width = 70; alliimg.height = 100;   alliimg.border=0;
   alliimg.setAttribute('usemap', '#alli');

   n2.appendChild(allimap);
   n.appendChild(alliimg);
}

function travissimo_marktalli() {
  if (window.location.href.match(/build\.php.*t=1/)) {
   var m = find("//tr[@class='rbg']",XPFirst);
   if (m) {
     m = m.parentNode;
     var z = m.getElementsByTagName("tr");
     z[0].childNodes[1].setAttribute('colspan', '8');
     z[1].appendChild(elem('td','Alliance'));
     z[z.length-1].childNodes[0].setAttribute('colspan', '8');
     for (var i=2; i<z.length-1; i++){
      var atd = document.createElement("td");
      atd.appendChild(document.createTextNode(z[i].childNodes[8].attributes[0].nodeValue));
      z[i].appendChild(atd);
     }
    }
  }
}


function travissimo_kpberechnung(){ // first line is language-specific
  if (window.location.pathname == '/build.php' &&  window.location.search.indexOf('s=2')>=0 &&
    (document.getElementsByTagName("h1")[0].innerHTML.indexOf("Pal")>=0 ||
      document.getElementsByTagName("h1")[0].innerHTML.indexOf("Resi")>=0)) {
   var b = document.getElementsByTagName('b'), prod = parseInt(b[3].innerHTML), stand= parseInt(b[4].innerHTML);
   var not = parseInt(b[5].innerHTML),  nd  = travissimo_kp2dorf(not);
   var text;

   if(not < stand){
     var md = travissimo_kp2dorf(stand);
     if (md == nd) text = 'You have enough points to found or conquer your <b>' + nrfmt(nd) +'</b> village.';
     else         text = 'You have enough points to found or conquer another '+nrfmt(md-nd+1)+' villages.';
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
     for (var i=1; i<5; i++){
      f[i].value = 0;
        f[i].addEventListener("change", travissimo_marktshowhandler, false);
      f[i].addEventListener("keyup", travissimo_marktshowhandler, false);
      f[i].addEventListener("move", travissimo_marktshowhandler, false);
     }
    var a = document.getElementsByTagName('table')[4].getElementsByTagName("a");
    for (var i=0; i<a.length; i++)   {
      a[i].addEventListener("click", travissimo_marktshowhandler, false);
      a[i].addEventListener("dblclick", travissimo_marktshowhandler, false);
    }
     for (var i=0; i<8; i++) f[i+1].tabIndex = (i+1);
     f[1].focus();
     travissimo_marktshowhandler();
  }
}
function travissimo_marktshowhandler(){
  var h = get('travissimo_markttdh'),k = get('travissimo_markttdk');
  var t = parseInt(document.getElementsByTagName('b')[5].innerHTML), f = document.getElementsByTagName('input');
  var l = 0, m = mc.match(/\d+/)[0]; // merchants: available/total
  for (var i=1; i<5; i++) l = l + parseInt(f[i].value);
  if (Math.ceil(l/t) > parseInt(m)) h.innerHTML = '<span style="color:red; font-weight:bold">'+Math.ceil(l/t)+'</span>';
  else                             h.innerHTML = Math.ceil(l/t);
  if(m*t-l < 0) k.innerHTML = "<span style=\"color:red; font-weight:bold\">-<br>" + m*t-l + "</span>";
  else          k.innerHTML =  "" + (Math.ceil(l/t)*t-l)  + "<br>" + (m*t-l);
}
function teutonix_hasHad() {
 var x = document.getElementsByTagName("iframe");
 hasAd = (x.length != 0);
 if (hasAd) eInd = 2;
}
function teutonix_selall() {
 unsafeWindow.Allmsg(this.form);
}
function insertVilaLink(element, x, y)
{
   var vilaid = 320801 + eval(x) -801*eval(y);
   var imgElement1, imgElement2, aElement1, aElement2, tdElement;

   imgElement1 = document.createElement("img");
   imgElement2 = document.createElement("img");
   aElement1 = document.createElement("a");
   aElement2 = document.createElement("a");
   tdElement = document.createElement("td");
   imgElement1.setAttribute('alt','Send Units');
   imgElement1.setAttribute('title','Send Units');   
   imgElement1.setAttribute('border','0');
   //imgElement1.src = "data:image/gif,GIF89a%10%00%0D%00%F7%00%00%FF%FE%FE%BC%BC%BC%FD%FD%FD___%F4%F4%F4%A6%BC%CDFIPccc__%5E%CA%D8%DE%23%2C%3C%F1%F1%F13%3CA%25%2B5%04%05%0A%D6%D7%D6%FE%FF%FC%C7%D2%DACCC0%3EH%E2%E2%E2%9D%AA%B3%92%92%94GFFk%8A%9B%CF%D4%DA%DF%E5%E7%7D%8A%8F8GK%C8%C7%C72AG%81%81%81%FF%FF%FEtst%90%8F%8F%7D%9E%AF%B7%B7%B8yxw%AC%AC%ACRi%7CWo%7D%E1%E1%E2%FC%FD%FC%93%9E%ADr%94%A0Qt%8E%8D%A3%ABk%87%91%CB%CB%CB%A0%A0%9Fi%7C%86g%7C%8Ft%8C%95s%88%91%DF%E0%DF%D4%D3%D5%ED%F1%F1%97%98%9A%CC%D1%D3%85%84%84%E8%E9%E6ILM%FD%FD%FB%C3%C4%C5n%83%8C%8A%A4%B6%B8%B4%B0%86%86%81%9D%9D%9D%B1%BF%C2q%88%8F%BD%BF%C0%87%9F%AEXXW%C0%BE%BE%BA%C7%CA%8B%8B%8B%8E%9E%A2%BF%BF%BFl%88%8F%B2%BF%C7%7D%94%9D%E6%E6%E5hhhajn%D5%DF%E4%CD%CB%CB%EF%F3%F6%FB%FC%FB%BC%BA%B8%0A%07%05E%5Bo%23()%AD%AE%ADDIQ%8E%8E%8E%82%82%82%C0%BF%BF%D6%D6%D5%5E%5E%5E%F5%F4%F4%7C%7C%7C%F0%F0%F0%E3%E3%E3o%90%AD%E6%E5%E6%BD%BD%BDl%8A%9E%80%9E%BAy%9B%AF%B6%BA%BDp%8F%99%FE%FE%FE~%89%8Csvz%B5%C7%D3Wx%94%DE%DE%DD%FC%FC%FCv%94%9Fh%87%95%EB%ED%F2%B0%AE%ADh%85%8C%3C%3C%3B%E2%E7%E4o%8E%A2%FB%FB%FBvxz%5Efl%E9%E9%E9%AD%BA%BE%9C%A9%AE%9D%B2%BF%8C%8C%8C%7F%8C%99%89%8C%8A%B3%BE%BFbbb%EC%EC%ECg%8B%B1%8F%8F%8F%FF%FF%FD%CA%CA%CA%99%98%97%B0%B0%B0o%85%8EWfm%E3%E9%EBr%91%A9%94%94%94%86%9E%B9IZb%82%9C%B6%CA%CD%CE%B6%BE%C7h%83%8D%FA%FA%F9%BF%CD%D7%B9%C3%C5%9A%A2%A7%A2%A8%B3LLL%F9%F9%F9%F8%F8%F8q%90%9A%FC%FD%FD555%EE%EE%EEs%8C%94%F7%F7%F7%AB%AB%AB%7C%7Cv%CE%CE%CE%A2%A2%A2~~%7Dt%8E%9Cm%86%93%E6%ED%F0%B7%C6%CD%FB%FD%FD%A9%AC%AE%E9%EA%ED%C2%C9%CE%00%00%00%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%10%00%0D%00%00%08%A1%00s%09%1C8%10%C6%94%02yd%0D%AC%03%03%D2%9B%0B%5B%A6%3C%8C%F8%A6%CE%C0%02z%A6p%C1u%AA%05%9D7%0Ea%10t8%A5%C5%14F0%E6%BC%91UG%E1%40%5CZ%B6%EC%A8X%40%09%0C%18%B2%F4%88%14%88k%CB%1B%94%B9%A6(%2C0%05%D2%CE%5C%0Af%8A%AC3E%60%1E%8C.s%B1%02%A9%D0%60AYB%06%BE%A1S%60%A0%CC%9Bo%94%40%B2%18%F4%CD%CE7S.%5D%90%88%B1%8F%C0%16%90%5C%5E%10Y%60%AD%927%AC%04J%B4h%90%87%C07%5C%40B%12X%20n.%18%17%A2%16%D816W%40%00%3B";
   imgElement1.src = "http://www.starkie.nl/travian/monkey/att_all.gif";
   imgElement2.setAttribute('alt','Send Resources');
   imgElement2.setAttribute('title','Send Resources');   
   imgElement2.setAttribute('border','0');
   //imgElement2.src = "data:image/gif,GIF89a%12%00%0C%00%E6%00%00%88M%25%F9%F4%E7%E2%C7%A9%CC%A8%82%E9%AA%3A%A2%85b%E1%91*%FB%E5%C4%BAw%26%DF%B2l%FF%FF%FF%E0%C4%89%C4%88H%E0%D0%C0%F1%E9%DF%E1%AAc%EB%C6%8F%CD%B5%9D%C3%91C%F8%F7%F4%E1%9FO%E0%A9P%F1%C8v%EE%D7%AF%F1%DA%BC%DC%7B%1A%E8%C7%9C%F3%E8%D5%C5%A0n%D7%B3%8D%F1%BA%5B%A2R%16%DB%C1%A6%F7%F0%E8%D8%81*%FE%FB%F0%B8%90g%EC%DD%C3%F0%D7%B3%DE%BE%A0%F2%96%23%EB%ABP%E8%D4%B6%EC%BCA%FB%EA%D3%FF%F5%DE%E8%D1%84%F8%C8l%E5%B6r%D4%B5%83%FF%E6%C5%FC%F1%E1%DE%C5%9F%C9%8CZ%EC%D1%9F%CD%8D6%F6%DB%A9%FA%ED%D2%F1%CD%80%E6%D8%BC%DA%BD%8C%FF%FC%F6%E8%94.%F4%D9%BC%E7%CD%96%FF%F9%E6%FC%F9%F5%EC%E0%B6%FF%F1%E5%EB%DB%CC%F6%EA%D9%8DU%25%F8%EC%C6%DE%C5%94%F7%E6%DE%F2%C6y%F4%C0%5D%DE%BD%A5%F0%B2U%E4%CA%8A%F1%B7v%FB%E8%D1%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00R%00%2C%00%00%00%00%12%00%0C%00%00%07%82%80R%82RB!%83%82%85%87%8A%1B19F%20%1B%1B'*%3D%8A%3D%01A4%3C6I%1C%03%17%40%17%02%07%01%83%01CH%0B%0BO%3A%2F0%10%1D%3F%02*%A5%83%3D%3B%11%18.%1E%2BL%16%17D%0D%20Q%873%25EF8N%04(K%23%8A%D0R%01%12%08%1F%24%D1%D0%13%05G%005%95%D8%83%23%0F%22%19%3E-%E0%83BP)%06%14%2C%E8%82%0D%09%157%0C%1A%DF%E0%0E%07%26%26%25%B5%87%81%00%00%3B";
   imgElement2.src = "http://s1.travian.com/img/un/r/2.gif";
   aElement1.setAttribute('href','a2b.php?z=' + vilaid);
   aElement2.setAttribute('href','build.php?z=' + vilaid + '&gid=17');
   
   aElement1.appendChild(imgElement1);
   aElement2.appendChild(imgElement2);

   /*tdElement.appendChild(aElement1);
   tdElement.appendChild(document.createTextNode(' '));
   tdElement.appendChild(aElement2);
   tdElement.appendChild(document.createTextNode(' '));
   tdElement.setAttribute('width','40');
   tdElement.setAttribute('align','right');
   element.parentNode.appendChild(tdElement);*/
   element.appendChild(document.createTextNode(' '));
   element.appendChild(aElement1);
   element.appendChild(document.createTextNode(' '));
   element.appendChild(aElement2);

}

function teutonix_changevilamenu() {
 if(window.location.href.match(/dorf3\.php/)) return;
 var menu = find("//a[@href='dorf3.php']",XPFirst).parentNode.parentNode;
 if (menu) {
   var listaTDs = menu.getElementsByTagName('td');
   var nome,x,y,vila;
   for (var i=0;i<listaTDs.length;i+=5)   {
      nome = listaTDs[i].textContent;
      x = listaTDs[i+2].textContent.replace('(','');
      y = listaTDs[i+4].textContent.replace(')','');
      vila = listaTDs[i];
      insertVilaLink(vila,x,y);
   }
 }
}


travissimo_igmlinks();
travissimo_navigationbar();
travissimo_marktalli();
travissimo_kpberechnung();
travissimo_marktsenden();
teutonix_changevilamenu();

addGlobalStyle('.rbg td {background-image: url(http://s2.travian.com/img/en/css/c2.gif);}  .menu a{padding-top:0px !important;padding-bottom:1px !important;} IMG[src="img/en/h/help.gif"],IMG[src="img//en/h/help.gif"] {display:none;} '); 