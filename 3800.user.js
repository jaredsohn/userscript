// WoD-Ausrufer user script
// version 0.2.2 BETA!
// 2006-01-25
// Copyright (c) 2005-6, Daniel Hohenberger
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "WoD-Ausrufer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WoD-Ausrufer
// @namespace     http://hd42.de/wod
// @description   Fuegt neben dem Ausrufer einen Button hinzu, der erlaubt, alle gerade aktuellen Meldungen anzuzeigen. Diese verschwinden dann in der ueblichen Taktrate wieder. || Adds a button next to WoD's town crier display that allows you to view all recent news. They will be hidden at the usual rate.
// @include         http*://*world-of-dungeons.*
// ==/UserScript==

var lang = 'de';
if(location.host.search('world-of-dungeons.net') != -1) lang = 'en';

var divs;
divs = document.getElementsByTagName('div');
var found = false;
for (var i = 0; i < divs.length && !found; i++) {
  thisDiv = divs[i];
  
  if(thisDiv.id.indexOf('sms') != -1){
    newButton = document.createElement('input');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('class', 'button');
    newButton.setAttribute('name', 'showAusrufer');
    if(lang=='de') newButton.setAttribute('value', 'Alle');
    else if(lang=='en') newButton.setAttribute('value', 'all');
 		newButton.addEventListener('click', showAusrufer, true);
    thisDiv.parentNode.parentNode.insertBefore(newButton, thisDiv.parentNode.nextSibling);
    thisDiv.parentNode.parentNode.style.whiteSpace = 'nowrap';
    found = true;
	}
}	 

function showAusrufer(event) {
	//divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
    thisDiv = divs[i];
    
    if(thisDiv.id.indexOf('sms') != -1){
	    thisDiv.style.display = 'block';
		}
	}	 
}


