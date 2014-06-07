// ==UserScript==
// @name           Hilite GBR
// @description    Highlights GB on the Wimbledon site
// @author         Mark CE
// @include        http://www.wimbledon.com/*
// @version        1.0
// ==/UserScript==

var Players = new Array("GBR");
var myColour = "Yellow";

var bucket = document.getElementsByTagName("body")[0].getElementsByTagName("span");
var e;
var c;
var px;
var ex;
var myfound;
var oldrank;
var newrank;
var relative;

c = 0;

for (var p = 0; p < Players.length; p++) {
    myfound = 0;
    px = Players[p].replace( /\s\s+/g, " " );
for ( var i = 0; i < bucket.length; i++ ) {
    e = bucket[i];
    if (e.className == "countrySeed") {
        ex = e.innerHTML.replace( /\s\s+/g, " " );
        if (ex.indexOf(px) >= 1) {
           e.style.background=myColour;
           
        }
    }  


}
}