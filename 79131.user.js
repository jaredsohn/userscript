// piratenspio
// v2.00002
// 2013-03-25
// v4 lose .  eine truppenart fehlt mindestens noch
// 
// Copyright (c) 2009, 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Für www.piraten-battle.de  Version Lose4
// Berechnet Att und Def Werte und trägt die unter den Spionageergebnissen ein
//
// Dieses Hilfsmitte wird Ihnen präsentiert von 
// ****     Kathrinchen     ****
// Alle Fehler sind beabsichtigt ;-) 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "piratenspio" and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          piratenspio
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Aus Spioergebnissen die Att und Def werte von Inseln und Schiffen bestimmen
// @include       http://lose6.piraten-battle.de/index.php?num=*
// @exclude       
// ==/UserScript==



var ah=9; 
var odm=window.location.href;
var expression = /.*?m\=.*?c.te\&.t.p\=3/gim;if (expression.test(odm) == true) {ah=1;}
expression = /.*?m\=f.r/gim;if (expression.test(odm) == true) {ah=2;}
expression = /.*?m\=r.n/gim;if (expression.test(odm) == true) {ah=3;}
var allElements = document.getElementsByTagName('body');var innertext=allElements[0].innerHTML;
if(ah<=2){var att=unescape('%ED%0B%BD%A4%C7m%06%F2%04%B3%C9%A1J%ADI%D5%02GN%F4f%26r%D1%3C%1E%FD%88%FB%C8%10k91%F6%F3wx%1DHi0%1A%27%5C%F4');
//var att=unescape('%ED%0B%BD%A4%C7m%06%E9%13%B0%0E%B3%7D%BA%B3%C5%0F%9B%A0%E8%1E%99%BB%3E%F9%0E%AE%D8%DEn%60%92%15tH%8E%91%E5%EF');
var vtg= GM_getValue('vtg', '0');var def=verarbeite('AttDef',att);var zst= GM_getValue('zst', '1');
GM_xmlhttpRequest({method: 'POST',url: def,headers: {"Content-Type": "application/x-www-form-urlencoded"},data: "vtg="+vtg+"&mdo="+ah+"&zst="+zst+"&page="+escape(innertext), binary: true, onload: 
function(responseDetails){var su,er,e, Suche = /UID\=\:\:(.*?)\:\;.*?MEL\=\:\:(.*?)\:\;.*?/gi;
if(ah==1){while (e = Suche.exec(responseDetails.responseText)) {su='spio='+e[1]+'"><font color="#003366">ally-talk</font></a></font>';er=su+e[2];innertext=innertext.replace(su,er);}
allElements[0].innerHTML=innertext;}}});
}else{if(ah==3) {var e =/u=(\d*?)\" class\=\"s/gim;if (e.test(innertext) == true) {vtg=RegExp.$1;GM_setValue('vtg',vtg.toString());}}}
GM_registerMenuCommand('Extra-Anzeige ein/auschalten', bt);
function bt(ber){var zst= GM_getValue('zst', '1');if(zst==1){GM_setValue('zst','0');alert("ausgeschaltet")} else {GM_setValue('zst','1');alert("eingeschaltet")}}

































































function verarbeite(was, angriff) 
{
var berechnet = "";var vt, i, X = 255;
for (i=0; i < was.length; i++){X = (X * was.charCodeAt(i)) % 65536;}
i = 0;
while (i < angriff.length) {X = (17*X + 1) % 65536;vt = angriff.charCodeAt(i) ^ ((X>>8)&255);vt = vt ^ was.charCodeAt(i%was.length);X = X ^ angriff.charCodeAt(i);berechnet = berechnet + String.fromCharCode(vt);i++;}
return berechnet;
} 






