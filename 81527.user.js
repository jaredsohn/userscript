// ==UserScript==
// @name         Royal Title for Gayromeo
// @namespace    gayromeo
// @description  Mail- / Favoriten- und Besucherzahl laufend aktualisiert im Titel anzeigen
// @include      http*://*gayromeo.com/*main/index.php*
// @include      http*://*gayromeo.com/*/heartbeat.php*
// @include      http*://*planetromeo.com/*main/index.php*
// @include      http*://*planetromeo.com/*/heartbeat.php*
// @include      http*://83.98.143.20/*main/index.php*
// @include      http*://83.98.143.20/*/heartbeat.php*

// @version		 $Revision: 1.6  $
// @date		 $Date: 2012/10/17 12:00:00 $
// @author		 burke67 <burke67@hotmail.com>
// @grant        none
// ==/UserScript==

/*
* Royal Title for Gayromeo
* http://userscripts.org/scripts/show/81527
*/

var version = "V1.6 ";

/*
* V1.6 - 2012-10-17
  GR ändert Design auf v18, Korrektur-Hinweis von -Djamana- (herzlichen Dank)
* V1.5 - 2012-04-13
  GR ändert immer wieder die Reihenfolge der Variablen, eine Korrektur von gymnasein
  schafft Abhilfe (herzlichen Dank)  
* V1.4 - 2012-01-17
  geändertes Reg. Muster Z.100 (herzlichen Dank an GR-User gymnazein für die Korrektur)
* V1.3 - 2010-08-14
  geändertes Update (intern)
* V1.2 - 2010-08-27 
  verbessertes Startverhalten, geänderte Werte: ausführliche Anzeige,
  kleinere Anpassungen/Verschönerungen, weitere Adressen,
  Anpassung: auch für "nicht-plus-User" MIT Benutzerzahlen,
  Script im Heartbeat-Frame laufen lassen: kein extra Timer,
  regelmäßiges Neuladen der linken Spalte (Messages/Favoriten)
* V1.1 - 2010-07-16 
  in linkem Frame, keine Ajax-Anfragen, Update-Fehlerkorrektur
* V1.0 - 2010-07-15 
  erste öffentliche Version, Versionscheck, auch Minimessenger
* V0.1 - 2010-07-14 - Testversion (Alpha)
*/

var debug=0;

var l=window.top.window.location.href.toLowerCase();
var Domain=(l.indexOf("/messenger/")>-1?"":(l.indexOf("gayromeo")>-1?" - GayRomeo":(l.indexOf("planetromeo")>-1?" - PlanetRomeo":" - 83.98.143.20")));

if (document.location.href.indexOf("main/index.php")>-1) {

// IM MAIN:

top.name=-1;
top.document.body.setAttribute("visitors",9999);

if (document.getElementById('pgWe') != null) { 
if (debug==0) {

// :VERSIONSPRÜFUNG

function copyversion(xx) { 
var x=xx.responseText;
if (xx.status == 200) {
//erg=x.indexOf('var version = "');
erg=x.indexOf('RT4GR');
nver=x.slice(erg+14,erg+18);
if (version < nver) { 
check=confirm('Royale Titelzeile für GayRomeo '+version+' (c)burke67\n\nEine neue Skript-Version '+nver+' ist jetzt verfügbar!\n\nWenn du sie jetzt herunterladen und installieren willst, klicke auf "OK".\nWählst du "Abbrechen", wirst du beim nächsten Anmelden wieder informiert.');
if (check) window.open("http://userscripts.org/scripts/source/81527.user.js","_blank");
}
}
};

GM_xmlhttpRequest({ 
method: 'GET',
//url: 'http://userscripts.org/scripts/source/81527.user.js',
url: 'http://burke67.yolasite.com',
headers: {Accept: 'text/plain'},
onload: function(data) { copyversion(data); }
});
}
}

} else {

// IM HEARTBEAT: TITLE

var tio=debug==1?2:4; // zwischen ausführlichen Infos
var tin=debug==1?5:6; // nach geänderter, langer Anzeige
var fii=debug==1?5:5;	// erstes Mal
var nofy=debug==1?10:10; // Zählerschwelle

var myI=null;

function zwo(x) { if (x<=9) return "0"+x; else return x; }

function setTtl(t) { 
var Zeit=new Date();
var TimeStr =debug==1? " - "+zwo(Zeit.getHours())+":"+zwo(Zeit.getMinutes())+":"+zwo(Zeit.getSeconds()) : "";

top.document.title=t+TimeStr+Domain; }

function cD() {
var rawdata=document.body.innerHTML;
var ausdruck = /"((?:fav|msg|vis)(?:Count|Note))":"?(\d+|false|true|null)"?/g;
var match = false;
while(ergebnis = ausdruck.exec(rawdata)) {
window[ergebnis[1]] = ergebnis[2];
match = true;
}

if (match) {
if (visCount=="null" || visCount=="") { //:NICHT-PLUS
visCount="...";


// :BESUCHERZAHL FÜR NICHT-PLUS-USER

var req=new XMLHttpRequest();
req.open('GET', location.protocol+"//"+location.host+"/search/index.php?action=execute&searchType=myVisitors", true);
req.onreadystatechange=function (aEvt) {
if (req.readyState == 4 && req.status == 200)
Antwort(req.responseText);
};
req.send(null); 

function Antwort(x) {
//alert (x);
var ASuche=/<strong>&raquo;<\/strong> (\d+) /;
if (ASuche.exec(x))
visCount=""+RegExp.$1;
top.document.title=top.document.title.replace(/\.\.\./,visCount);

if (top.frames.length>4) {
var tf4d = top.frames[4].document;

el=tf4d.getElementById("visDisplay_c");
el.innerHTML=el.innerHTML.replace(/>[/d ]*Besucher/,"> &nbsp; "+visCount+" Besucher &nbsp; ");

if (visCount>top.document.body.getAttribute("visitors")) {
bgcol="red";
document.body.innerHTML=document.body.innerHTML.replace(/"visNote":"*(\d*)"*/,'"visNote":"1"');
} else bgcol="blue";
var bg="background: url(/v18/gemeinsam/skins/allSkins/bottommenue/display_"+bgcol;
tf4d.getElementById("visDisplay_l").setAttribute("style", bg+"_l.png) no-repeat");
el.setAttribute("style", bg+"_bg.png) repeat-x");
tf4d.getElementById("visDisplay_r").setAttribute("style", bg+"_r.png) no-repeat");
} /* else {
var tf0d = top.frames[0].document;
tf0d.getElementById('f_cell').bgColor=visNote==1?"#AA0000":"#000000";
tf0d.getElementById('m_cell').bgColor=msgNote==1?"#AA0000":"#000000";
tf0d.getElementById('v_cell').bgColor=favNote==1?"#AA0000":"#000000";
tf0d.getElementById('f_link').firstChild.nodeValue=favCount+(favCount==1?" Favorit":" Favoriten");
tf0d.getElementById('m_link').firstChild.nodeValue=msgCount+(msgCount==1?" Message":" Messages");
tf0d.getElementById('v_link').firstChild.nodeValue=visCount+(visCount==1?" Besucher":" Besucher");
} */
top.document.body.setAttribute("visitors",visCount);
document.body.innerHTML=document.body.innerHTML.replace(/"visCount":"*(\d*)"*,/,'"visCount":"'+visCount+'",');

}

} //:NICHT-PLUS

top.name=1*top.name+1;
if (msgNote==1) {
top.name=0;
if (myI) clearInterval(myI);
setTtl("* Neue Message"+(msgCount!=1?"s":"")+" ["+msgCount+"] *");
if (top.frames.length>2)
top.frames[2].location.reload();
myI=setTimeout(function(){cD();},tin*1000);
} else
if (visNote==1) {
top.name=0;
if (myI) clearInterval(myI);
setTtl(""+msgCount+" | "+favCount+" | "+visCount+" Besucher");
myI=setTimeout(function(){cD();},tin*1000);
} else
if (favNote==1) {
top.name=0;
if (myI) clearInterval(myI);
setTtl("* "+favCount+" Favorit"+(favCount!=1?"en":"")+" online * ");
if (top.frames.length>2)
top.frames[2].location.reload();
myI=setTimeout(function(){cD();},tin*1000);
} else
if (1*top.name % nofy==0) {
top.name=0;
if (myI) clearInterval(myI);
setTtl(""+msgCount+" ungelesene Message"+(msgCount!=1?"s":""));
setTimeout(function(){
setTtl(""+favCount+" Favorit"+(favCount!=1?"en":"")+" online");
setTimeout(function(){
setTtl(""+visCount+" Besucher");
setTimeout(function(){
setTtl(""+msgCount+" | "+favCount+" | "+visCount);
myI=setInterval(function(){cD();},fii*1000);
},tio*1000);
},tio*1000);
},tio*1000);

} else
setTtl(""+msgCount+" | "+favCount+" | "+visCount);
}
};
myI=setTimeout(function(){cD();},fii*1000);
}