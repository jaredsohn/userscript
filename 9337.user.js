// LyricWiki Cleaner
// version 0.1
// 2007-05-18
// Copyright (c) 2007, Eric Cohen <eirc.eirc@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LyricWiki Cleaner
// @namespace     http://adyta.no-ip.org
// @description   Appends a button next to the title that cleans the lyricwiki pages so that only lyrics are displayed (no ads, menus and stuff...)
// @include       http://lyricwiki.org/*
// @include       http://www.lyricwiki.org/*
// ==/UserScript==

button = document.createElement("input");
button.setAttribute("value", "Clear");
button.setAttribute("alt", "Clear");
button.setAttribute("type", "button");
button.setAttribute("onClick", "document.getElementById('globalWrapper').innerHTML = document.getElementById('content').innerHTML");
document.getElementById('content').childNodes[5].appendChild(button);
