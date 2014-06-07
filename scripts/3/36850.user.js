// ==UserScript== 
// @name           Style Corrector
// @author         Nufros (loosely based on original Color Corrector by Erik Nomitch)
// @description    Style Corrector (by Nufros) allow you to edit colors, fonts and borders of text boxes, input ares, drop-down menus and buttons in Firefox
// @namespace      userscripts.org/scripts/show/36850
// @include        *
// @exclude        http://*.deviantart.com/*
// @exclude        http://*.myspace.tld/*
// @exclude        http://*.youtube.tld/*
// ==/UserScript==



// UPDATE INFO
// 2.1 improved form functions
// 2.2 improved option functions
// 2.3 improved select functions
// 2.4 rounded corners
// 2.5 improved button functions
// 2.6 improved border functions
// 2.7 added font style and size functions
// Nov26/08: Changed Script name from "Color Corrector 2.7" to "Style Corrector"
// Jan17/09: excluded youtube



// Default color scheme (black and white) can be easily edited to whatever colors you want (hex or word --- eg., #000000 or "black")
// for hex color codes I use http://www.colorpicker.com, but you can get them anywhere...

// in "font-family" make sure to enter a font that is installed on your computer (or leave blank for page default)
// leave "font-size" blank for page default, or enter a size in px
// turn off rounded corners by setting "-moz-border-radius" to 0px
// change border thickness by editing "border: 1px solid"



GM_addStyle("input { background-color: white !important; }");
GM_addStyle("input { font-family: ; font-size: ; color: black !important; }");
GM_addStyle("input { padding: 2px; border: 1px solid; border-color: black; -moz-border-radius: 7px !important; }");
GM_addStyle("textarea { background-color: white !important; }");
GM_addStyle("textarea { color: black; font-family: ; font-size:  !important; }");
GM_addStyle("textarea { padding: 2px; border: 1px solid; border-color: black; -moz-border-radius: 7px !important; }");
GM_addStyle("option { background-color: white !important; }");
GM_addStyle("option { color: black; font-family: ; font-size:  !important; }");
GM_addStyle("option { padding: 0px; border: 0px solid; border-color: black; -moz-border-radius: 4px !important; }");
GM_addStyle("select { background-color: white !important; }");
GM_addStyle("select { color: black; font-family: ; font-size:  !important; }");
GM_addStyle("select { padding: 3px; border: 1px solid; border-color: black; -moz-border-radius: 7px !important; }");
GM_addStyle("button { background-color: white !important; }");
GM_addStyle("button { color: black; font-family: ; font-size:  !important; }");
GM_addStyle("button { padding: 3px; border: 1px solid; border-color: black; -moz-border-radius: 7px !important; }");
