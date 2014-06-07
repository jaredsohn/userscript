// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ehrensenf
// @namespace     http://www.christophmueller.org
// @description   Script to remove Ehrensenf advertisment
// @include       http://www.ehrensenf.de/*
// ==/UserScript==

window.document.getElementById("downloadLink").style.visibility="visible";
var downloadlink=window.document.getElementById("downloadLink").href;
parent.frames[0].location.href=downloadlink;


