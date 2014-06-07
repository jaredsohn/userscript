// ==UserScript==
// @name           Velib large map
// @namespace      http://czo.free.fr/software/greasemonkey
// @description	   Show velib map fullscreen
// @include        http://www.velib.paris.fr/les_stations/trouver_une_station
// ==/UserScript==
// Filename: veliblargemap.user.js
// Author: Czo <Olivier.Sirol@lip6.fr>
// License: GPL (http://www.gnu.org/copyleft/gpl.html)
// Started: 30 Aout 2007
// Last Change: Friday 31 August 2007, 11:16
// Edit Time: 0:25:14
 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeElementById(id) {
 var obj;
 obj = document.getElementById(id);
 if (obj) {
     obj.parentNode.removeChild(obj);
 }
}

removeElementById('bandeau_haut');
removeElementById('bandeau_nav');
removeElementById('coll_droite');
removeElementById('coll_gauche');
removeElementById('footer');
addGlobalStyle('.skyscrapper {visibility: hidden; !important;');
addGlobalStyle('breaker {width: 1px; !important;');


var map;
map = document.getElementById('map_1646');
if (map) {
    map.style.position = 'absolute';
    map.style.left = '0px';
    map.style.top = '0px';
    map.style.width = '100%';
    map.style.height = '100%';
}


 
