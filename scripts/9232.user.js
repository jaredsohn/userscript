// Custom Style - PbN Styles
// Version 0.1
// 11 - 13 - 2006
// Name: Haxorz
// Created by: ah_skeet
// Script & style released under GPL
// http://www.gnu.org/copyleft/gpl.html
// Style generator source released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Download style generator source here:
// http://nothingoutoftheordinary.com/customstyle/customstyle.tar.gz
// Generated Mon, 13 Nov 2006 23:39:20 -0500
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to Install User Script.
// Accept the default configuration and install.
//
// If you are upgrading from a previous version of Custom Style - PbN Styles, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select Custom Style - PbN Styles, and click Uninstall.
//
// --------------------------------------------------------------------
//
// Description:
// 1. Changes the Stylesheet of the pages
// 2. Designed for No Sidebar, but a sidebar will work, though it might not look like it should be with the style. I'll fix this sometime.
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Haxorz  - PbN Styles
// @namespace     http://nothingoutoftheordinary.com/customstyle/
// @description   Give me liberty or give me death.
// @include      http://*.pbnation.com/*
// ==/UserScript==


//Adding all the freaking styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body{ background: #000000; color: #FFFFFF; font: 10pt verdana, arial, helvetica, sans-serif; margin: 5px 10px 10px 10px; padding: 0px;} \n '+
'a:link{ color: #00ff18;} \n '+
'a:visited{ color: #00ff18; } \n '+
'a:hover, a:active{ color: #00ff18;} \n '+
'.page{ background: #000000; color: #FFFFFF;} \n '+
'td, th, p, li{ font: 10pt verdana, arial, helvetica, sans-serif;} \n '+
'.tborder{ background: #151515; color: #FFFFFF; border: 1px solid #B5B5B5;} \n '+
'.tcat { background: #000000; color: #FFFFFF; font: bold 10pt verdana, arial, helvetica, sans-serif;} \n '+
'.tcat a:link{ color: #FFFFFF; text-decoration: none; } \n '+
'.tcat a:visited{ color: #FFFFFF; text-decoration: none;} \n '+
'.tcat a:hover, .tcat a:active { color: #FFFFFF; text-decoration: underline;} \n '+
'.thead{ background: #000000; color: #FFFFFF; font: bold 11px verdana, arial, helvetica, sans-serif; } \n '+
'.thead a:link{ color: #00ff18; } \n '+
'.thead a:visited{ color: #00ff18;} \n '+
'.thead a:hover, .thead a:active{ color: #00ff18; } \n '+
'.tfoot { background: #000000; color: #FFFFFF;} \n '+
'.tfoot a:link{ color: #FFFFFF;} \n '+
'.tfoot a:visited{ color: #FFFFFF; } \n '+
'.tfoot a:hover, .tfoot a:active { color: #CCCCCC; } \n '+
'.alt1, .alt1Active{ background: #000000; color: #FFFFFF; } \n '+
'.alt2, .alt2Active { background: #000000; color: #FFFFFF; } \n '+
'td.inlinemod{ background: #FFFFCC; color: #000000;} \n '+
'.wysiwyg { background: #404040; color: #FFFFFF; font: 10pt verdana, arial, helvetica, sans-serif;} \n '+
'textarea, .bginput{ background: #000000; color:#00ff18; font: 10pt verdana, arial, helvetica, sans-serif; } \n '+
'.button{ font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'select{font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'option, optgroup{font-size: 11px; font-family: verdana, arial, helvetica, sans-serif;} \n '+
'.smallfont{ font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'.time{ color: #FFFFFF; } \n '+
'.navbar{ font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'.highlight{color: #FFFFFF; font-weight: bold;} \n '+
'.fjsel{ background: #3E5C92; color: #E0E0F6;} \n '+
'.fjdpth0{ background: #F7F7F7; color: #000000;} \n '+
'.panel{background: #000000; color: #FFFFFF; padding: 10px;} \n '+
'.panelsurround { background: #; color: #FFFFFF;} \n '+
'legend{color: #FFFFFF; font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'.vbmenu_control{background: #000000; color: #FFFFFF; font: bold 11px verdana, arial, helvetica, sans-serif; padding: 3px 6px 3px 6px; white-space: nowrap;} \n '+
'.vbmenu_control a:link{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_control a:visited{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_control a:hover, .vbmenu_control a:active{ color: #FFFFFF; text-decoration: underline;} \n '+
'.vbmenu_popup{ background: #151515; color: #FFFFFF; border: 1px solid #B5B5B5;} \n '+
'.vbmenu_option{ background: #000000; color: #FFFFFF; font: 11px verdana, arial, helvetica, sans-serif; white-space: nowrap; cursor: pointer;} \n '+
'.vbmenu_option a:link{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_option a:visited{ color: #FFFFFF; text-decoration: none; } \n '+
'.vbmenu_option a:hover, .vbmenu_option a:active{ color: #FFFFFF; text-decoration: none; } \n '+
'.vbmenu_hilite{ background: #000000; color: #FFFFFF; font: 11px verdana, arial, helvetica, sans-serif; white-space: nowrap; cursor: pointer;} \n '+
'.vbmenu_hilite a:link{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_hilite a:visited{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_hilite a:hover, .vbmenu_hilite a:active{ color: #FFFFFF; text-decoration: none;} \n '+
'.bigusername { font-size: 12pt; } \n '+
'td.thead, div.thead { padding: 4px; } \n '+
'.pagenav a { text-decoration: none; } \n '+
'.pagenav td { padding: 2px 4px 2px 4px; } \n '+
'.fieldset { margin-bottom: 6px; } \n '+
'.fieldset, .fieldset td, .fieldset p, .fieldset li { font-size: 11px; } \n '+
'form { display: inline; } \n '+
'label { cursor: default; } \n '+
'.normal { font-weight: normal; } \n '+
'.inlineimg { vertical-align: middle; } \n '+
'.modfont { color: #0094ff; font-weight: bold; } \n '+
'#bannercontainer { height: 62px; background: #000000; padding: 3px; border: 1px solid #B5B5B5; text-align: center;} \n '+
'.bannersmall{ width: 120px; height: 60px; border: 1px solid #FFFFFF;} \n '+
'.bannerlarge{ width: 486px; height: 60px; border: 1px solid #FFFFFF;} \n '+
'.spacer{ margin-left: 3px; margin-right: 3px; border-left: 1px solid #B5B5B5; border-right: 1px solid #B5B5B5; height: 4px; background: #000000; } \n '+
'#buttoncontainer{ text-align: center; border: 1px solid #B5B5B5; background: #000000; padding: 3px 0px 3px 0px; } \n '+
'a.button { background-color: #000000; padding: 0px .7em 0px .7em; border: 1px solid #FFFFFF; font-weight: bold; text-decoration: none;} \n '+
'a.button:hover { background-color: #0036ff;} \n '+
'#logocontainer{ border: 1px solid #B5B5B5; background: #000000; width: 100%;} \n '+
'#navbitcontainer{ text-indent: 3px; border: 1px solid #B5B5B5;} \n '+
'#logocell{ padding-left: 5px; width: 100%;  } \n '+
'.lscell{ background: #000000; border: 1px solid #151515;} \n '+
'.subforum, .subforum a:link, .subforum a:visited{ text-decoration: none; color: #FFFFFF;} \n '+
'.subforum a:hover{ text-decoration: underline;} \n '+
'.googlemap{ font: 11px verdana, arial, helvetica, sans-serif; text-decoration: none; color: #000000;} \n '+
'.googlemap a:link, .googlemap a:visited{ font: 11px verdana, arial, helvetica, sans-serif; text-decoration: underline; color: #2F00FF;} \n ');