// Answers
// version 0.9
// 2007-01-25
// Copyleft (c) 2006, The Laughing Lizard 
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
// select "Answers", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Answers
// @description   Adds Hebrew translation to title if there is one on the page
// @include       http://www.answers.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
if((t = document.getElementsByName("idioms_hebrew")).length > 0) document.getElementsByTagName("h1")[1].innerHTML += '<a href="#idioms_hebrew">' + t[0].parentNode.childNodes[4].nodeValue + '</a>';
