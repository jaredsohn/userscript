// MakeFetGray
// version 1.2 2009-04-30
// version 1.1 2009-04-30
// version 1.0 2009-04-23
// Copyright © 2009 Septimus
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
// select "MakeFetGray", and click Uninstall.
//
// based on http://diveintogreasemonkey.org/download/cdreadable.user.js
//
// --------------------------------------------------------------------
//
// ==UserScript==

// ==UserScript==
// @name           MakeFetGray
// @namespace      http://userscripts.org/users/87905
// @description    Make FetLife less black and white
// @include        http://fetlife.com/* 
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

var vgHover		= "#eee";
var vgBack		= "#ddd";
var vgNewGrp	= "#ccc";
var vgAltBack	= "#bbb";
var vgHFBack	= "#999";
var vgAltHead	= "#555";
var vgBQuote	= "#444";
var vgColor		= "#222";
var vgHead		= "#a00";

addGlobalStyle("body { color: " + vgColor + " ! important;" +"background:" + vgBack + " ! important; } ");
addGlobalStyle("a { color:" + vgColor + " ! important;}");
addGlobalStyle("blockquote { color:" + vgBQuote + " ! important;}");
addGlobalStyle("h4 { color: " + vgAltHead + " ! important; }");
addGlobalStyle("h2, h3 { color: " + vgHead + " ! important; }");
addGlobalStyle("a:focus, a:hover, ul.previous_next li a:hover, ul#tabnav a:hover { background-color: " + vgHover + " ! important; }");
addGlobalStyle("ul.list_of_groups_your_are_a_member_of li.new_items { background-color: " + vgNewGrp + " ! important; }");

addGlobalStyle("#header, #footer { background-color: " + vgHFBack + " ! important;}");
addGlobalStyle("#header .logged_in ul.main_nav li.logo h1 a { background-color: " + vgHFBack + " ! important; }");

addGlobalStyle("#sub_menu, #join_group, #profile .button a, #profile .friends_badge, #modal_container { background-color: " + vgAltBack + " ! important; }");
addGlobalStyle("#profile .friends_badge { background-color: " + vgHFBack + " ! important; }");
addGlobalStyle("ul#tabnav li.in_section a { background-color: " + vgBack + " ! important; }");
addGlobalStyle("ul#tabnav { background-color: " + vgBack + " ! important; }");
addGlobalStyle("ul#tabnav li a, ul#tabnav li.in_section { background-color: " + vgAltBack + " ! important; }");
addGlobalStyle("#main_content, #main_content_w_secondary  { background-color: " + vgBack + " ! important; }");
addGlobalStyle("#profile .wall, .empty, fieldset, .small_box, .event_header, ul.previous_next li a { background-color: " + vgAltBack + " ! important; }");

addGlobalStyle(".group_post h3 a,  dl.legend dt .new_discussion , div.auto_complete ul li.selected { background-color: " + vgHead + " ! important; color: " + vgBack + " ! important; }");
addGlobalStyle(".group_post h3 a:visited { background-color: " + vgAltBack + " ! important; color: " + vgColor + " ! important; }}");
addGlobalStyle("div.auto_complete { background: " + vgAltBack + " ! important;}");
