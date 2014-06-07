// ==UserScript==
// @name          Google & Garfield v2.1.1
// @include       http://google.*/*
// @include       http://www.google.*/*
// @description	  Adds Garfield comic to the bottom of the Google page.
// ==/UserScript==

// The code below is copied from Garfield's website, and is edited by urbanlegend.
// Updates:
// 2007-04-17: By derIch: made it more compact :), should now work until the url is changed on the server

function addZero(num){
if (num < 10){
num = "0" + num;
}
return num;
}
var now = new Date();
// set time to NY local
now.setUTCHours(now.getUTCHours() - 5);
// I know when DST is used it's -4, but getting an old picture is better than getting an brocken one! ;) 

var year = now.getUTCFullYear();
var yearNum = (year + "").substr(2);
var monthNum = addZero(now.getUTCMonth() + 1);
var dayNum = addZero(now.getUTCDate()); 

var stripName="http://images.ucomics.com/comics/ga/";

var c_strip = stripName + year + "/ga" + yearNum + monthNum + dayNum + ".gif";

// This adds the image to the last Center element of the Body.
var f = document.firstChild.childNodes[1].getElementsByTagName("center");
var i = document.createElement("img");
i.src = c_strip;
f[f.length - 1].appendChild(document.createElement("br"));
f[f.length - 1].appendChild(i); 