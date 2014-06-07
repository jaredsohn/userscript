// ==UserScript==
// @name           Malware Vault colors
// @namespace      vault.lostlogic.net
// @include        https://vault.lostlogic.net/*
// @version        1
// @grant          none
// ==/UserScript==
//
// By G. Vujovic
//
// The script adds colors to the Malware Vault page.
//

var cells = document.getElementsByTagName('td');
var c1 = '#E37E3B'; //orange
var c2 = '#8CE329'; //green
var c3 = '#78AAE3'; //blue
var m1 = new RegExp('(winxp-base)','g');
var m2 = new RegExp('(winxp-sp2)','g');
var m3 = new RegExp('(winxp-sp3)','g');

for (var i=0; i<cells.length; i++) {
  var elm = cells[i];
  if (elm.textContent.match(m1))
    colorIt(elm,c3,m1);
  if (elm.textContent.match(m2))
    colorIt(elm,c1,m2);
  if (elm.textContent.match(m3))
    colorIt(elm,c2,m3);
}

function colorIt(elm,color,what){
  opentag = '<span style="padding: 2px; margin: 1px; -webkit-border-radius: 3px 3px 3px 3px;-moz-border-radius: 3px 3px 3px 3px;border-radius: 3px 3px 3px 3px;background-color:'+color+';color:white;">';
  elm.innerHTML = elm.innerHTML.replace(what, opentag+"$1</span>");
}
