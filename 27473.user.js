
// Efficient Google Evaluation user script
// version 0.1
// 2008-05-14
// Copyright (c) 2008, Eric Cohen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Efficient Google Evaluation", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Efficient Google Evaluation
// @namespace     http://www.eirc.gr/
// @description   makes rating google results more efficient
// @include       https://www.google.com/evaluation/search/rating/*
// ==/UserScript==

function openURL() {
    link = document.getElementsByTagName('tbody')[1].rows[1].cells[1].firstChild
    window.urlTarget = link.target
    window.open(link.href, link.target)
}

function openGoogle() {
    link = document.getElementsByTagName('tbody')[0].rows[0].cells[0].childNodes[1]
    window.googleTarget = 'GoogleTab'
    window.open(link.href, 'GoogleTab')
}

openGoogle()
openURL()

