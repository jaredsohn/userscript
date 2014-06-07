// ==UserScript==
// @name            MyBrute.com - Cell upgrade
// @namespace       
// @description     MyBrute.com - Cell upgrade: 
// @include http://*.mybrute.com/cellule
// ==/UserScript==
var oLevelBar = document.getElementsByClassName('levelBar')[0];
var oLevelTxt = document.createElement('div');

var sLevelPercent = oLevelBar.style.width;
var sLevel = new String(sLevelPercent).substr(0, sLevelPercent.length - 1);

oLevelTxt.innerHTML = '<a href="http://userscripts.org/scripts/show/35759" title="get this cool add-on at userscripts.org" target="_blank">' + new Number(sLevel).toFixed(2) + '%</a>';

oLevelTxt.style.width = '100px'; //oLevelBar.parentNode.style.width
oLevelTxt.style.fontSize = '12px';
oLevelTxt.style.textAlign = 'center';

document.getElementsByClassName('level')[0].appendChild(oLevelTxt);