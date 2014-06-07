// ==UserScript==
// @name       swappatil
// @namespace  ???
// @description  Maximizes the denodo case popup
// @include    https://*telogical.leankitkanban.com/Boards/View/*
// @include    http://*telogical.leankitkanban.com/Boards/View/*
// @include    http://*telogical.leankitkanban.com/*
// ==/UserScript==

$(document).ready(
function()
{
alert("Just executing the javascript");
$("div.ui-dialog").css('height','642px');
$("div.ui-dialog").css('width','1253px');
$("div.ui-dialog").css('top','0px');
$("div.ui-dialog").css('left','0px');
});




$("li#card_15273444").dblclick(
function()
{
 alert("Double click Handler Clicked");
 $("div.ui-dialog-titlebar").append
("<button id=\"clickme\" onclick=\"open_window()\">Click Me</button>");
});