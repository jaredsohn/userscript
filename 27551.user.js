// Bringing Back the MCB version 1.0
// version 0.1
// 2008-05-30
// Copyright (c) 2008
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
// To uninstall, go to Tools/Manage User Scripts
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Custom Theme for MCB - mcarterbrown.com
// @namespace     http://w3.org/1999/xhtml
// @description   Brings the custom theme back to the glory days of MCB v1.0
// @include	  http://*mcarterbrown.com*
// ==/UserScript==

//Adding the new styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body{ background: #DDD; color: #000; font: 10pt verdana, arial, helvetica, sans-serif; margin: 5px 10px 10px 10px; padding: 0px;} \n '+
'a:link{ color: #039;} \n '+
'a:visited{ color: #039; } \n '+
'a:hover, a:active{ color: #900;} \n '+
'.page{ background: #DDD; color: #000;} \n '+
'td, th, p, li{ font: 10pt verdana, arial, helvetica, sans-serif;} \n '+
'.tborder{ background: #DDD; color: #000; border: 1px solid #B5B5B5;} \n '+
'.tcat { background: #369; color: #FFF; font: bold 10pt verdana, arial, helvetica, sans-serif;} \n '+
'.tcat a:link{ color: #FFF; text-decoration: none; } \n '+
'.tcat a:visited{ color: #FFF; text-decoration: none;} \n '+
'.tcat a:hover, .tcat a:active { color: #FFF; text-decoration: underline;} \n '+
'.thead{ background: #369; color: #FFF; font: bold 11px verdana, arial, helvetica, sans-serif; } \n '+
'.thead a:link{ color: #FFF; } \n '+
'.thead a:visited{ color: #FFF;} \n '+
'.thead a:hover, .thead a:active{ color: #FFF; } \n '+
'.tfoot { background: #369; color: #fff;} \n '+
'.tfoot a:link{ color: #fff;} \n '+
'.tfoot a:visited{ color: #fff; } \n '+
'.tfoot a:hover, .tfoot a:active { color: #fff; } \n '+
'.alt1, .alt1Active{ background: #DDCCCC; color: #000;  border-top: thin solid #eebbbb; border-right: thin solid #996666; border-left: thin solid #eebbbb; border-bottom: thin solid #996666; border-width: 1px 1px 1px 1px; } \n '+
'.alt2, .alt2Active { background: #CCCCDD; color: #000; border-top: thin solid #EEEEEE; border-right: thin solid #666699; border-left: thin solid #EEEEEE; border-bottom: thin solid #666699; border-width: 1px 1px 1px 1px; } \n '+
'td.inlinemod{ background: #FFFFCC; color: #000000;} \n '+
'.wysiwyg { background: #FFFFCC; color: #000; font: 10pt verdana, arial, helvetica, sans-serif;} \n '+
'textarea, .bginput{ background: #DDD; color:#000; font: 10pt verdana, arial, helvetica, sans-serif; } \n '+
'.button{ font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'select{font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'option, optgroup{font-size: 11px; font-family: verdana, arial, helvetica, sans-serif;} \n '+
'.smallfont{ font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'.time{ color: #000; } \n '+
'.navbar{ font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'.highlight{color: #FFFFFF; font-weight: bold;} \n '+
'.fjsel{ background: #3E5C92; color: #E0E0F6;} \n '+
'.fjdpth0{ background: #F7F7F7; color: #000000;} \n '+
'.panel{background: #E1E1E2; color: #000; padding: 10px;} \n '+
'.panelsurround { background: #; color: #FFFFFF;} \n '+
'legend{color: #FFFFFF; font: 11px verdana, arial, helvetica, sans-serif;} \n '+
'.vbmenu_control{background: #369; color: #FFF; font: bold 11px verdana, arial, helvetica, sans-serif; padding: 3px 6px 3px 6px; white-space: nowrap;} \n '+
'.vbmenu_control a:link{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_control a:visited{ color: #FFFFFF; text-decoration: none;} \n '+
'.vbmenu_control a:hover, .vbmenu_control a:active{ color: #FFFFFF; text-decoration: underline;} \n '+
'.vbmenu_popup{ background: #369; color: #FFF; border: 1px solid #B5B5B5;} \n '+
'.vbmenu_option{ background: #369; color: #FFF; font: 11px verdana, arial, helvetica, sans-serif; white-space: nowrap; cursor: pointer;} \n '+
'.vbmenu_option a:link{ color: #FFF; text-decoration: none;} \n '+
'.vbmenu_option a:visited{ color: #FFF; text-decoration: none; } \n '+
'.vbmenu_option a:hover, .vbmenu_option a:active{ color: #FFF; text-decoration: none; } \n '+
'.vbmenu_hilite{ background: #369; color: #FFF; font: 11px verdana, arial, helvetica, sans-serif; white-space: nowrap; cursor: pointer;} \n '+
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
'#bannercontainer { height: 62px; background: #DDD; padding: 3px; border: 1px solid #B5B5B5; text-align: center;} \n '+
'.bannersmall{ width: 120px; height: 60px; border: 1px solid #FFFFFF;} \n '+
'.bannerlarge{ width: 486px; height: 60px; border: 1px solid #FFFFFF;} \n '+
'.spacer{ margin-left: 3px; margin-right: 3px; border-left: 1px solid #000; border-right: 1px solid #B5B5B5; height: 4px; background: #DDD; } \n '+
'#buttoncontainer{ text-align: center; border: 1px solid #000; background: #DDD; padding: 3px 0px 3px 0px; } \n '+
'a.button { background-color: #DDD; padding: 0px .7em 0px .7em; border: 1px solid #000; font-weight: bold; text-decoration: none;} \n '+
'a.button:hover { background-color: #0036ff;} \n '+
'#logocontainer{ border: 1px solid #B5B5B5; background: #DDD; width: 100%;} \n '+
'#navbitcontainer{ text-indent: 3px; border: 1px solid #B5B5B5;} \n '+
'#logocell{ padding-left: 5px; width: 100%;  } \n '+
'.lscell{ background: #DDD; border: 1px solid #000;} \n '+
'.subforum, .subforum a:link, .subforum a:visited{ text-decoration: none; color: #FFFFFF;} \n '+
'.subforum a:hover{ text-decoration: underline;} \n '+
'.googlemap{ font: 11px verdana, arial, helvetica, sans-serif; text-decoration: none; color: #000;} \n '+
'.googlemap a:link, .googlemap a:visited{ font: 11px verdana, arial, helvetica, sans-serif; text-decoration: underline; color: #2F00FF;} \n ');

/*
CHANGE LOG

05-30-2008 - BETA 0.1

*/