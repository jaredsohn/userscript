// ==UserScript==
// @name       RYM Blogspotter
// @namespace  http://http://rateyourmusic.com/~eighteensecond
// @version    0.52
// @description  creates link to google with "[artist][albumname] blogspot" query
// @include    http://rateyourmusic.com/release/*
// @copyright  2013+, 18ths
// ==/UserScript==

var album = document.getElementsByClassName("sametitle")[0].innerHTML;
var artist = document.getElementsByClassName("artist")[0].innerHTML;
var node = document.getElementsByClassName("album_shortcut")[0];

var lnk = document.createElement("a");
lnk.setAttribute("target", "_blank");
lnk.setAttribute("href", "http://www.google.pl/search?q=%22" + album + "%22 " + "%22" +artist + "%22" + " blogspot");

lnk.style.fontSize = "small";

var lnk_content = document.createTextNode("Blogspot this release");
lnk.appendChild(lnk_content);

var parentDiv = node.parentNode;

parentDiv.insertBefore(lnk, node);