// ==UserScript==
// @name           Background picture
// @namespace      Doug Barrett
// @include        http://*
// ==/UserScript==

var setprefs = function() {

if(GM_getValue("page_picture")==="undefined")
{
GM_setValue("page_picture", "http://");
}

var setpic = prompt("Set page background picture:", GM_getValue("page_picture"));
GM_setValue("page_picture", setpic);

if(confirm("Do you want this picture for all pages?"))
{
GM_setValue("page_picture_boolean", "true")
} else
{
GM_setValue("page_picture_boolean", "false");
}

document.body.background = setpic;
}

if(GM_getValue("page_picture_boolean")==="true")
{
document.body.background = GM_getValue("page_picture");
}

GM_registerMenuCommand("Set background picture", setprefs);