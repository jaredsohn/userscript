// ==UserScript==
// @name           slickgmx
// @namespace      http://bmk81.wordpress.com
// @description    Entfernt bis auf das Loginfenster alles auf der Startseite von gmx.net.
// @include        http://www.gmx.net/*
// ==/UserScript==

//This script by itself isn't slick at all ^^
//It is my first one and it was only possible with help.
//Feel free to change it and make it your one.


//Part1 - Removing IDs (inspired by O'REILLY Greasemonkey Hacks)
badids = new Array("header", "navigation", "statusline", "sitebar", "footer", "featuredNews", "toppromo", "skipContent", "features", "eoContent");
var i=0;
for (i=0;i<=5;i++){	
var elmDeleted = document.getElementById(badids[i]);
	elmDeleted.parentNode.removeChild(elmDeleted);
}

//Part2 - Removing CLASSes (with huge help by w35l3y)
var badclasses = ["channels", "uim"];
for ( var ai = badclasses.length - 1 ; ~ai ; --ai )
for each ( var obj in document.getElementsByClassName(badclasses[ai]) )
obj.parentNode.removeChild(obj);


//Part3 - Resizing (not removing) IFRAMEs (inspired by different solutions)
var badFrames, iambadFrame;
badFrames = document.getElementsByTagName('iframe');
for (var z = 0; z < badFrames.length; z++) {
    iambadFrame = badFrames[z];
	iambadFrame.height = 0;
	iambadFrame.width = 0;
}