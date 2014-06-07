// ==UserScript==
// @name      Background colour changer                 
// @namespace      Doug Barrett
// @include        http://*
// ==/UserScript==

var setprefs = function() {

if(GM_getValue("page_colour")==="undefined")
{
GM_setValue("page_colour", "#FFFFFF");
}

var setcolour = prompt("Page Background Colour:", GM_getValue("page_colour"));
GM_setValue("page_colour", setcolour);

if(confirm("Do you want this colour for all pages?"))
{
GM_setValue("page_colour_boolean", "true")
} else
{
GM_setValue("page_colour_boolean", "false");
}

document.body.style.background = setcolour;
}

if(GM_getValue("page_colour_boolean")==="true")
{
document.body.style.background = GM_getValue("page_colour");
}

GM_registerMenuCommand("Set background colour", setprefs);