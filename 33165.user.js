// ==UserScript==
// @name           Display ABBRs and ACRONYMs
// @namespace      http://www.paramour.net78.net/
// @include        *

// ==/UserScript==
try {
var trufal;
function trueO() {
 trufal=true;
}
function displayA() {
 var abbr, acro;
 abbr = document.getElementsByTagName("abbr");
 acro = document.getElementsByTagName("acronym");
 var i=0;
 var abba, textABBR;
 for(i=0;i<=abbr.length;i++) {
  if(abbr[i]) {
  textABBR=document.createTextNode("<abbr title=\""+abbr[i].title+"\">"+abbr[i].innerHTML+"</abbr>");
  abbr[i].parentNode.replaceChild(textABBR, abbr[i]);
  delete textABBR;}
 }
 var r=0;
 var afro, textACRO;
 for(r=0;i<=acro.length;r++) {
  afro=acro[r];
  textACRO=document.createTextNode("<acronym title=\""+afro.title+"\">"+afro.innerHTML+"</acronym>");
  afro.parentNode.replaceChild(textACRO, afro);
  delete textACRO;
 }
}
displayTHINGS=function() {
 displayA();
 displayA();
 displayA();
}
GM_registerMenuCommand("Display ABBR", displayTHINGS);
} catch(e) { alert(e.description) }