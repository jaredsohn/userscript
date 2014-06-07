// Cruncyroll.com ad remover
// 2007-3-21
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CrunchyRoll Ad Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CrunchyRoll Ad Remover
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Remove ad on crunchyroll.com
// @include       http://www.crunchyroll.com/*
// ==/UserScript==

var ads = document.getElementsByName("adbrite_ad");
for (var i=0; i< ads.length; i++) {
    ad = ads[i];
    ad.parentNode.removeChild(ad);
}

var adbox = document.getElementById("adbox");
if(adbox != null){
    adbox.parentNode.removeChild(adbox);
}