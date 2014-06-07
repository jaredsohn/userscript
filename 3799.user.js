// WoD-Lager-Sort user script
// version 0.2.1 BETA!
// 2006-01-25
// Copyright (c) 2006, Daniel Hohenberger
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
// select "WoD-Lager-Sort", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WoD-Lager-Sort
// @namespace     http://hd42.de/wod
// @description   Aendert in Lager, Keller, Schatzkammer und Gruppenlager den "Gefunden"-Sortier-Button so, dass beim ersten klick die neuesten Items zuerst angezeigt werden. || Changes the initial sort direction after clicking the 'found' header
// @include         http*://*world-of-dungeons.*/wod/spiel/hero/items.php*
// ==/UserScript==
  
var allInputs; 
allInputs = document.getElementsByTagName('input');
for (var i = 0; i < allInputs.length; i++) {
    thisInput = allInputs[i];
    
    if(thisInput.type=='submit' && thisInput.name.indexOf('_DO_SORT')!=-1 && thisInput.getAttribute('class')=='table_hl' && (thisInput.value=='Gefunden' || thisInput.value=='found')){
    	var name = thisInput.name;    	
    	if(name.indexOf("_ASC_")!=-1) thisInput.setAttribute('name', name.replace(/_ASC_/,'_DESC_'));
	}
}

