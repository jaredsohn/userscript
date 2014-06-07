// Sacrorona LSCU Top Frame Hacker Maded by Timieh
// version 1.0
// 2006-12-17
// Copyright (c) 2006, Harry Marr
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Shoutwire Top Frame Remover
// @description   Remove the annoying frame that shoutwire adds to its linked pages.
// @include       http://www.sacracorona.nl/*
// @include       http://www.sacracorona.nl/*
// ==/UserScript==

var searchClass = "header";
var classElements = new Array();
var els = document.getElementsByTagName("a");
var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
for (i = 0, i < els.length; i++) {
	if ( pattern.test(els[i].className) ) {
		els[i].setAttribute('onClick',"");
	}
}
