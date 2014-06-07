// Computerra Auto Width user script
// version 1
// 2007-07-25
// Copyright (c) 2007, aivanoff
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
// @name          Computerra Auto Width
// @namespace     http://diveintogreasemonkey.org/download/
// @description   reset all width-fixed elements to float-fixed
// @include       http://www.computerra.ru/*
// ==/UserScript==


//div structure:
// id = terralab	-> move to right
// id = page		-> width=100%
//  id = main
//   id = main2
//    class = content	-> set right margin
//     id = article
//    class = content


// id = terralab
var bar = document.getElementById('terralab');
bar.style.left = '';
bar.style.right = '0px';


// id = page
var elem = document.getElementById('page');
elem.style.width = '100%';


// class = content
var size = bar.clientWidth;

var divs = document.evaluate(
    "//div[@class='content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < divs.snapshotLength; i++) {
    elem = divs.snapshotItem(i);
    elem.style.marginRight = size + 'px';
}