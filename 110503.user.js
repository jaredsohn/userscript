// Garso Script
// version 0.6
// 2011-08-17
// Copyright (c) 2011, Taki Jeden
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GarsoScript", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GarsoScript
// @namespace     http://userscripts.org/users/takijeden
// @description   Skrypt usuwający reklamy oraz inne graficzne elementy sugerujące tresc garsoniery
// @include       http://www.garsoniera.com.pl/
// @include       http://www.garsoniera.com.pl/*
// ==/UserScript==

function delItem(what) {
    var allDivs, thisDiv;
    allDivs = document.evaluate(
        what,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        if (thisDiv) {
    	    thisDiv.parentNode.removeChild(thisDiv);
	}
    }
}

if (document.location.href == 'http://www.garsoniera.com.pl/'){
    document.location.href = 'http://www.garsoniera.com.pl/forum/index.php';
}


//Usuwamy niedyskretne elementy
delItem("//span[@class='bbc_center']");
delItem("//div[@id='right_column']/div[1]");
delItem("//div[@id='branding']/a[1]");
delItem("//div[@id='branding']/div[@id='roksa']");
delItem("//div[@id='L2r1c1']");
delItem("//div[@id='L2r1c2']");
delItem("//div[@id='L2r2c2']");

//Usuwamy tło z popupu logowania
allDivs = document.evaluate(
    "//div[@id='show']/div[@class='popup_block']/div[@class='popup']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    if (thisDiv) {
    	thisDiv.style.background="none";
    }
}

//Zmianimy tytuł
allDivs = document.evaluate(
    "//head/title",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    if (thisDiv) {
    	thisDiv.innerHTML = 'G!Script';
	}
}

// Usuwamy favicon
var link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', '');
 
var head = document.getElementsByTagName('head')[0];
head.appendChild(link);

