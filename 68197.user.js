// ==UserScript==
// @name        fileshare.in.ua helper for Opera 9/10, GreaseMonkey and Chrome
// @version     3.0
// @date        11.03.2011
// @author      ki0 <ki0@ua.fm>
// @download	http://userscripts.org/scripts/source/68197.user.js
// @include	http://fileshare.in.ua/*
// @include	http://www.fileshare.in.ua/*
// @exclude	http://fileshare.in.ua/f*
// @exclude	http://fileshare.in.ua/u*
// @exclude	http://fileshare.in.ua/*.aspx*
// @exclude	http://www.fileshare.in.ua/f*
// @exclude	http://www.fileshare.in.ua/u*
// @exclude	http://www.fileshare.in.ua/*.aspx*
// ==/UserScript==

//start downloading automatically
var autostart = /*@Enable automatic downloading start@bool@*/ true/*@*/;

if ((document.location.href.indexOf("free") < 0) && (document.location.href.indexOf("gogogo") < 0)) {
    if (document.location.href.indexOf("f_id") < 0)
        document.location.href = document.location.href + "?free";
    else if (document.location.href.indexOf("frid") < 0)
        document.location.href = document.location.href + "&frid=0";
}

var link = document.getElementById("ads");
if (link) {
    document.location.href = link.href + "&frid=0";
}
var link = document.getElementById("dl_link");
if (link) {
    link.onclick = "";
    link.target = "";
    if (autostart)
        document.location.href = link.href;
}
