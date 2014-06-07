// ==UserScript==

// @name GrooveShark - no Ads
 (latest)
// @namespace 

// @version  2.0 

// @description    Removes the ads, extends player to fill the screen

// @include        http://listen.grooveshark.com/*

// @author         Nathan Broadbent (original by Manish Chiniwalar)

// @license        GNU GENERAL PUBLIC LICENSE

// ==/UserScript==





//remove sidebar

var adSidebar = document.getElementById('capital');

if (adSidebar) {

    adSidebar.parentNode.removeChild(adSidebar);

}





GM_addStyle("#application { margin-right: 0px !important;}");

//end