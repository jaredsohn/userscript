// ==UserScript==
// @name History of the Seen
// @namespace bca_1QJwtr2Wk1RmhARm3Bv1LmDN2gEQCLp743
// @description Script to implement a history of the seen approach for some news sites. Tested with Firefox 27.0.1 and GreaseMonkey 1.15
//
// @author          Theoky
// @version	        0.1a
// @lastchanges     Initial version.
//
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_deleteValue
// @grant      GM_registerMenuCommand
// @grant      GM_listValues
//
// @include http*://*.derstandard.at/*
// @include http*://*.faz.net/*
// @include http*://*.golem.de/*
// @include http*://*.handelsblatt.com/*
// @include http*://*.heise.de/newsticker/*
// @include http*://*.kleinezeitung.at/*
// @include http*://*.nachrichten.at/*
// @include http*://*.oe24.at/*
// @include http*://*.orf.at/*
// @include http*://*.reddit.com/*
// @include http*://*.spiegel.de/*
// @include http*://*.sueddeutsche.de/*
// @include http*://*.welt.de/*
// @include http*://*.wirtschaftsblatt.at/*
// @include http*://*.zeit.de/*
// @include http*://dastandard.at/*
// @include http*://derstandard.at/*
// @include http*://diepresse.com/*
// @include http*://diestandard.at/*
// @include http*://kurier.at/*
// @include http*://slashdot.org/*
// @include http*://taz.de/*
//
// @require http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js
// ==/UserScript==

// This program is free software; you can redistribute it and/or modify it
// under the terms of the  GNU General Public License as published by the
// Free Software Foundation; either version 2 of the License,
// or (at your option) any later version.

// -------------------------------------------------
// Functions

function resetAllUrls()
{
    if (confirm('Are you sure you want to erase the complete weak history?')) {
        var keys = GM_listValues();
        for (var i=0, key=null; key=keys[i]; i++) {
           GM_deleteValue(key);
        }
        document.location.reload(true);
    }
}

function resetUrlsForCurrentSite()
{
    if (confirm('Are you sure you want to erase the weak history for ' + 
       document.baseURI + '?')) {
        var keys = GM_listValues();
        for (var i=0, key=null; key=keys[i]; i++) {
            var base = GM_getValue(key);
            if (base == document.baseURI)
            {
                GM_deleteValue(key);
            }
        }
        document.location.reload(true);
    }
}

// Main part

// Menus
GM_registerMenuCommand("Remove seen history for this site.", resetUrlsForCurrentSite);
GM_registerMenuCommand("Remove all seen history!", resetAllUrls);


// Vars
var allHrefs = document.getElementsByTagName("a");
var theBase = document.baseURI;
var elemMap = {};

// Change the DOM

// First loop: gather all new links
for(var i = 0; i < allHrefs.length; i++)
{
	var hash = 'm' + CryptoJS.MD5(allHrefs[i].href);
	// setValue needs letter in the beginning, thus use of 'm'
    
	var key = GM_getValue(hash);
	//console.log(hash.toString());
    
	if (typeof key != 'undefined') {
		// key found -> loaded this reference already 
		// change display
		allHrefs[i].style.opacity = 0.3;
	} else {
		elemMap[hash] = theBase;
	}
}

// remember all new urls to hide the next time
for (var e2 in elemMap) {
    GM_setValue(e2, elemMap[e2]);
}

