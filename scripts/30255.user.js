// Persian Friendfeed
// version 0.9
// 2008-18-07
// Copyright (c) 2008, Amir Abbas Abdolali
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Persian Friendfeed
// @namespace     http://www.designaryan.com/
// @description   this script will change the direction of the page and optimize fonts for Persian language inside Friendfeed
// @include       http://friendfeed.com/*
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

addGlobalStyle("a:hover {text-decoration: none; } .logo { direction: rtl; padding-right: 15px; padding-left: 0!important;} body, input, textarea, select, select option { font-size: 12px; font-family: tahoma, sans-serif!important; line-height: 1.4;} #tabhead .login { left: 15px;} #tabhead .tabs {  left:40%; direction: rtl; z-index: 2;} #tabhead .settings { left: 15px;} #infobox {left: 0; direction: rtl;} .streaminfo,#feedshare,#feedcontainer { float: right; clear: both;} .streaminfo table td {padding: 0 0 0 10px;} #feedshare table td {padding: 0!important;} #feedcontainer table td {padding: 0;} #feedcontainer { direction: rtl;} .feed .cluster .icon {float: right;} .feed .cluster .body {margin: 0 23px 0 0;} .feed .entry .likes { background-position: 98.5% 0px;} .feed .entry .comments .comment, .feed .entry { padding: 0 12px 0 0; margin-top: 0.4em;}.likes { padding: 0 32px 0 0; margin-top: 0.4em;} .feed .entry .comments .comment .friendcomment .quote { background-position: 98% 6px!important;} .feed .entry .comments .comment {background-position: 98% 6px;} .popupmenu .shadow {right: 1px; left: -2px;} #rightsearch { left: 0;} .pager, #feedviews { clear: both; text-align: right;} table.undersharepromo {float: right; clear: both;} img.undersharepromo {margin-left: 435px;} .streaminfo table {direction: rtl;} #rightsearch input, .sharefocus { direction: rtl;} #infobox .friendname img {margin: 0 0 0 5px;} #infobox .small {margin: 0 20px 0 0} .feed .entry .media td {padding: 0 0 0 10px!important;} #footer{text-align: right; margin: 0 15px;} .info, .likes { direction: ltr; text-align: right;} .amir { text-align: right; padding: 0 15px 20px;} .amir p {margin: 0;} .feed .entry .comments .comment .quote { background-position: 98% 6px; float: right; height: 20px; margin: 0;} .feed .entry .commentexpander {padding: 0 16px 0 0;} .popupmenu { left: -10px; } .feed .entry .comments .comment .content, .feed .entry {padding: 0 20px 0 0;} .likes {padding: 0 32px 0 0;} .entry, .other { padding: 0!important;} .infomessage, .errormessage { float: right; clear: both; text-align: right;} #sharedialog {right: 25px;} #userpopup .shadow { left: 0px;} .feed .entry .comments .comment.friendcomment .quote {background-position: 98% 6px;} ");

var copyright = document.createElement("div");
copyright.innerHTML = '<div class="amir"><p> ' +
'Persian layout by Amir Abbas Abdolali &copy; <a href="http://www.designaryan.com/" target="_blank" >Design Aryan</a>' +
'</p></div>';
document.body.insertBefore(copyright, document.body.lastChild);
