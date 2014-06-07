// Be* forum sunglasses
// version 0.8 
// 26-04-2007
// Copyright (c) 2007, Rob Freeman (kandr)
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
// select "Be* Forum colour change", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Be* Forum colour change
// @namespace     http://iamawake.co.uk/
// @description   Alter CSS styles on bethere.co.uk's forums to ease strain on the eyes.
// @include       https://bethere.co.uk/*
// @include       https://*.bethere.co.uk/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'a:hover {' +
'	color : #960053 ! important;' +
'}' +
'td.row1 {' +
'	background-color: #e5e5e5 ! important;' +
'}' +
'td.row2 {' +
'	background-color: #f0f0f0 ! important;' +
'}' +
'td.cat,td.catHead,td.catSides,td.catLeft,td.catRight,td.catBottom {' +
'	background-color:#f0f0f0 ! important;' +
'}' +
'th {' +
'	background-color : #960053 ! important;' +
'}' +
'.maintitle, h1, h2 {' +
'	color : #960053 ! important;' +
'}' +
'a.gen:hover, a.genmed:hover, a.gensmall:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.mainmenu {' +
'	color : #960053 ! important;' +
'}' +
'a.mainmenu:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.cattitle {' +
'	color : #960053 ! important;' +
'}' +
'a.cattitle:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.forumlink {' +
'	color : #960053 ! important;' +
'}' +
'a.forumlink:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.forumlink:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.nav {' +
'	color : #960053 ! important;' +
'}' +
'a.nav:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.topictitle:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.postlink:link {' +
'	color : #960053 ! important;' +
'}' +
'a.postlink:visited {' +
'	color : #960053 ! important;' +
'}' +
'a.postlink:hover {' +
'	color : #960053 ! important;' +
'}' +
'a.copyright {' +
'	color : #960053 ! important;' +
'}' +
'a.copyright:hover {' +
'	color : #960053 ! important;' +
'}'
);

