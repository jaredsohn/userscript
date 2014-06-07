// Hightlight Gmail Contacts Label
// version 1.1
// 2010-06-23
// Copyright (c) 2010, Fuhan Fan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hightlight Gmail Contacts Label
// @description   Hightlights the Contacts label in Gmail
// @include       http*://mail.google.com/mail/*
// ==/UserScript==

document.addEventListener(
	"DOMNodeInserted",
	function(){
		if(document.getElementById(":re")) {
			document.getElementById(":re").style.fontWeight = "bold";
		}
	},
	true);

//
// ChangeLog
//
// 2010-06-23 - 1.1
// fixed Contacts lable can't be highlighted bug
// add support for firefox with greasemonkey
//
// 2010-06-20 - 1.0 - First version of Hightlight Gmail Contacts Label
//
