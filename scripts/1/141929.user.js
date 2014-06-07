// ==UserScript==
// @name        KG - small tweaks
// @namespace   KG
// @include     http*://*karagarga.net/*
// @exclude     http*://forum.karagarga.net/*
// @grant	none
// @version     1.7
// ==/UserScript==

// don't run in iFrames
if (!window.frameElement) {

        // change forum tab link to show new posts
        var links = document.getElementById("ddimagetabs").getElementsByTagName("a");
        for (i=0; i < links.length; i++ ) {
                if (links[i].textContent.indexOf("Forum") != -1) {
                        links[i].href = "https://forum.karagarga.net/index.php?app=core&module=search&do=viewNewContent&search_app=forums";
                }
        }
        	
} // end iframe check