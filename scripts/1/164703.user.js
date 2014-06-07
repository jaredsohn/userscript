// ==UserScript==
// @name        Netvibes like Google Reader
// @namespace   
// @updateURL      https://userscripts.org/scripts/source/164703.meta.js
// @author pippoz
// @description Change Netvibes reader list view to be more like Google Reader
// @include     http://www.netvibes.com/privatepage/*
// @version     0.9
// @grant       GM_addStyle
// ==/UserScript==

var bcg = "#ECECCE";
var fontFam = "arial,sans-serif"


//Apply new CSS to list view elements
var cssString = 
".entry-row.autoclear{font-weight:bold;}" 
+ ".entry-row.autoclear:hover{background-color:rgb(255, 255, 204) !important; margin-right: 0px;}"  //giallo
+ ".entry-row .entry-title i{color: rgb(0, 0, 0);font-weight: normal; margin-right: 0px;}"
+ ".hasEnclosures .entry-row:hover .entry-title span{margin-right: 0px;}"
+ ".hasEnclosures .entry-row .entry-title span{margin-right: 0px;}"
+ ".hasAudio .entry-row:hover .entry-title span{margin-right: 0px;}"
+ ".hasAudio .entry-row .entry-title span{margin-right: 0px;}"
+ ".entry-row:hover .entry-title span {margin-right: 0px;}"
+ ".read .entry-row.autoclear:hover{background-color:rgb(219, 232, 255) !important;}"  //blu
+ ".read .entry-row.autoclear{color: rgb(80, 80, 80);font-weight: normal;}"
+ ".read .entry-row a{color: rgb(0, 0, 0);font-weight: normal;}"
+ ".read .entry-row .entry-title i {color: rgb(100, 100, 100);font-weight: normal;}"
+ ".entry-header .entry-innerTitle{font-family:" + fontFam + ";font-weight:bold;font-size: 20px !important;}" 
+ ".entry-innerInfos{font-size: 10px !important;}" 
+ ".entry-content.autoclear{font-family:" + fontFam + ";font-size:105% !important;}" 
+ ".viewThisFeed{font-family:" + fontFam + ";}"
+ ".entry-title i{font-family:" + fontFam + ";}"
+ ".entry-title-text{font-family:" + fontFam + ";}"
+ "#smartreader-feeds-headerTop h3{font-family:" + fontFam + "; font-style: normal;font-variant: normal;font-weight: bold;font-size: 17px;line-height: normal;}"
+ "#smartreader-feeds-headerEdit a{font-size: 9px !important;}"
+ "div.groupItems-title {height: 30px;line-height: 30px;background: none repeat scroll 0% 0% rgb(229, 229, 229);color: rgb(0, 0, 0);font-family:" + fontFam + ";font-size:1.3em !important;padding-left: 10px;}"
+ "#smartreader-feeds-selectionActions .icon > .img {width: 122px;}"
;



GM_addStyle(cssString);






