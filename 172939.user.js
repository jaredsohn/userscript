// ==UserScript==
// @name        Travian stats ench
// @namespace   T4
// @description Top robbing income per hour
// @include     http://*.travian.*/statistiken.php?id=0&idSub=3
// @version     1
// ...
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ...
// ==/UserScript==



{
//priferminti resursai imami is lenteles
var res=document.getElementById("top10_raiders").rows[12].cells[2].firstChild.nodeValue; 
//gaunama savaites diena ir valandos
var d = new Date();
var savdie = d.getDay();
var val = d.getHours(); 
//paskaiciuojama res/h
var perh = res / (((savdie - 1) * 24) + val) ;
var aper = perh / 4 ;


//lentele
var trows = document.getElementById("top10_raiders").rows.length;
document.getElementById("top10_raiders").rows[0].insertCell(3).innerHTML="Res/h";
document.getElementById("top10_raiders").rows[0].insertCell(4).innerHTML="Res/h/4";
for (var i = 1; i<trows-2; i++){
var allres=document.getElementById("top10_raiders").rows[i].cells[2].firstChild.nodeValue;
var table=document.getElementById("top10_raiders").rows[i].insertCell(3).innerHTML=(allres/ (((savdie - 1) * 24) + val)).toFixed(0);
var table=document.getElementById("top10_raiders").rows[i].insertCell(4).innerHTML=((allres/ (((savdie - 1) * 24) + val))/4).toFixed(0);
}
document.getElementById("top10_raiders").rows[12].insertCell(3).innerHTML=(perh).toFixed(0);
document.getElementById("top10_raiders").rows[12].insertCell(4).innerHTML=(perh/4).toFixed(0);

}