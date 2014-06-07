// Aftonbladet freshener script
// version 0.1 BETA
// 2007-07-20
// Copyright (c) 2007, Hardnoise
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Aftonbladet freshener", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Aftonbladet freshener
// @namespace     http://userscripts.org/
// @description   script to clean up ads from Aftonbladet.se
// @include       http://www.aftonbladet.se/*
// ==/UserScript==

window.freshener = function() {
    var objTopAd = document.getElementById('AB_adArea_T10');

		// If element was not found, retry until it is found!
    if (objTopAd == null) 
    {
    	window.setTimeout('freshener()', 10);
    }
    else 
		{
			cleanitup();
    }
}

function cleanitup() {
killad('AB_adArea_T10');
killad('AB_adArea_R10');
killad('AB_adArea_B10');
killad('AB_adArea_B01');
killad('AB_adArea_F10');
killad('AB_adArea_L01');
killad('AB_adArea_H21');
killad('AB_adArea_H22');
killad('AB_adArea_H23');
killad('AB_adArea_H24');
killad('FinContentBottom1');
killad('techsource_Position1');
killad('OAS_AD_Middle');
}

function killad(objId) {
var objAd = document.getElementById(objId);
objAd.parentNode.removeChild(objAd);
}

freshener();