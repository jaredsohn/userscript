// ==UserScript==
// @name        Auto Cookie Clicker
// @author      Reblerebel
// @namespace   *
// @description Clicks the cookie automatically, buys upgrades automatically, clicks golden cookies automatically
// @include     http://orteil.dashnet.org/*
// @version     1.5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function ClickLoop()
{
$("#bigCookie").click();
window.setTimeout(ClickLoop, 1);
}
ClickLoop();

function delayedLoop()
{
$("#goldenCookie").click();

var i = 0;
for(i;i<10;i++){
var U0C = $("#upgrade" + i);
if(U0C.attr('class') == "crate upgrade enabled"){
U0C.click();
}
}

var i = 0;
for(i;i<10;i++){
var P0C = $("#product" + i);
if(P0C.attr('class') == "product enabled"){
P0C.click();
}
}

window.setTimeout(delayedLoop, 1000);
}
delayedLoop();