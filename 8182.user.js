// FM4 Ogg Stream User Script
// 2007-03-28
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FM4 Ogg Stream", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FM4 Ogg Stream
// @namespace     http://swanky.de/greasemonkey/
// @description   Adds a link to the unofficial ogg stream on fm4.orf.at.
// @source        http://userscripts.org/scripts/show/8182
// @include       http://fm4.orf.at/*
// @version       0.0.2
// ==/UserScript==

// Squirrels are your friends!

var pitas = document.createElement("div");
pitas.innerHTML = '<style type="text/css">a.pitas:link, a.pitas:visited, a.pitas:hover, a.pitas:active {text-decoration: none; font-weight: normal; color:#CCCCCC;}</style><font face="verdana,arial,helvetica,sans-serif" size="-1"><a href="http://fm4.amd.co.at/" class="pitas">(un)official FM4 live stream</a> <a href="http://fm4.amd.co.at/m3us/listen-low.m3u">[32kbit mono]</a> <a href="http://fm4.amd.co.at/m3us/listen-medium.m3u">[64kbit stereo]</a> <a href="http://fm4.amd.co.at/m3us/listen-high.m3u">[160kbit stereo]</a></font>';
document.body.insertBefore(pitas, document.body.firstChild);

// 0.0.1	Initial release.
// 0.0.2        Cleaning up the code.