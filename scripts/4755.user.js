// ==UserScript==
// @name          Customized Forums
// @namespace     yup jimbo
// @description	  customized forum
// @include       http://forum.myspace.com/*
// ==/UserScript==
// Notes: css in forums sucks tom :)

var sHeader = "";
sHeader = sHeader + "div td div td b {background-color:green; display:block; text-align:center;}";
sHeader = sHeader + "div td div td td b {background-color:transparent;}";
sHeader = sHeader + "div td font {display:none;}";
sHeader = sHeader + ".navbar {font-size:10px !important;color:green !important;}";
sHeader = sHeader + "div div td td font {display:inline;}";
sHeader = sHeader + "div div td td td div {color:green; font-size:15px !important;}";
sHeader = sHeader + "div td td font {display:inline;}";

GM_addStyle(sHeader);

// set the body background
GM_addStyle("body {background-color:black;}");
// set the bottom links div to transparent
GM_addStyle("div {background-color:transparent !important;}");
// make the tables transparent
GM_addStyle("table, tr, td {background-color:transparent;}");
// style the tables
GM_addStyle("table table table table table {background-color:green; height:40px; padding:1px; border:3px black double;-moz-border-radius:15px;}");
GM_addStyle("table table table table table table {border:0px;}");
// define the fonts
GM_addStyle("* {font-family:georgia !important; font-size:12px !important;}");
// style the column titles
GM_addStyle("div div td td b font {background-color:green; padding:3px; display:block; text-align:center;-moz-border-radius:15px;}");
// style the posters images
GM_addStyle("div p a img {width:90px; height:auto; border:2px double black;-moz-border-radius:15px;}");
// style the
GM_addStyle("div p a {color:green !important; font-size:18px !important;}");
// style the original posters below links
GM_addStyle(".classifiedstext {color:green !important;}");
// style everyone else's below links
GM_addStyle(".classifiedstext font u {color:green !important;}");
// set the
GM_addStyle("p span.text a {color:green !important;}");
// style the city state info
GM_addStyle("div div {color:green !important;}");
// fix text in preview
GM_addStyle(".blue_border td {color:green;}");
// fix some links
GM_addStyle("a {color:green !important;}");