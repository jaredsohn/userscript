// ==UserScript==
// @name           Show All Evolutions
// @namespace      urbanrivalsmodbytwk
// @description    Allows you to see non-acquired evolutions. Fell free to contact me in-game.
// @include        http://www.urban-rivals.com/*
// @version        0.1
// @author         TwK
// ==/UserScript==

function CheckImgs(){
var getpics = document.getElementsByTagName("img");
var result;
var imglen;
var imgparts;
for (var i=0;i<getpics.length;i++)
{
result = getpics[i].src;
imgparts = result.split("_");
if(imgparts[5] == "GRAY.gif"){
getpics[i].src = imgparts[0] + "_" + imgparts[1] + "_" + imgparts[2] + "_" + imgparts[3] + "_" + imgparts[4] + ".gif"; 
}
}
}

var checkthis = window.setTimeout(CheckImgs,200);
checkthis = window.setTimeout(CheckImgs,500);
checkthis = window.setTimeout(CheckImgs,1000);
checkthis = window.setTimeout(CheckImgs,1500);
checkthis = window.setTimeout(CheckImgs,2000);
checkthis = window.setTimeout(CheckImgs,2500);