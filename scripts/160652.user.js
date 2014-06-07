// ==UserScript==
// @name           Stop the eplayer
// @description    Stop the eplayer
// @author         Mark CE
// @include        http://*
// @version        1.0
// ==/UserScript==

var killPlayers = new Array("http://static.eplayer.performgroup.com/ptvFlash/eplayer2/Eplayer.swf");

var myColours = new Array("Tomato","Orange","PaleGoldenrod","LightGreen","Aquamarine","CornflowerBlue","Pink");
var nonColour = "#CCCCEE";
var killColour = "#666699";

var bucketObject = document.getElementsByTagName("body")[0].getElementsByTagName("object");
var bucket2 = document.getElementsByTagName("body")[0].getElementsByTagName("script");
var e;
var c;
var px;
var ex;
var myfound;

c = 0;

for (var p = 0; p < killPlayers.length; p++) {
    myfound = 0;
    px = killPlayers[p];
for ( var i = 0; i < bucketObject.length; i++ ) {
    e = bucketObject[i];
    ex = e.data;
    if (ex.indexOf(px)==0 ) {
        e.data='nada';
    }
}
}
