// ==UserScript==
// @name           Kongregate Game Page Titles
// @namespace      http://tapuri.org
// @description    Removes "Play " and ", a free online game on Kongregate" from page titles while on game pages of Kongregate
// @include        http://www.kongregate.com/games/*
// ==/UserScript==


if(document.title.indexOf("Play ") == 0)
{
	document.title = document.title.replace("Play ", "").replace(", a free online game on ", " [") + "]";
}

