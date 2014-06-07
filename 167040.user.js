// ==UserScript==
// @name        Netvibes Change Font Color
// @namespace   
// @updateURL      http://userscripts.org/scripts/source/167040.user.js
// @author James
// @description Change Netvibes reader list view Font
// @include     http://www.netvibes.com/privatepage/*
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==

var bcg = "#ECECCE";
//var fontFam = "arial,sans-serif"
var fontFam = "微软雅黑,微软雅黑"

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
+ ".read .entry-row .entry-title i {color: rgb(255, 0, 0);font-weight: normal;}"
+ ".entry-header .entry-innerTitle{font-family:" + fontFam + ";color: rgb(0, 0, 255);font-weigh(0,0,0);bold;font-size: 18px !important;}" 
+ ".entry-innerInfos{font-size: 10px !important;}" 
+ ".expandedView .read .entry-header .entry-innerTitle {color: rgb(120, 120, 120);}"
+ ".expandedView .read .entry-header .entry-innerInfos {color: rgb(120, 120, 120);}"
+ ".expandedView .focus .entry-header .entry-innerTitle{font-family:" + fontFam + ";color: rgb(0, 0, 255);font-weigh(0,0,0);bold;font-size: 18px !important;}" 
+ ".entry-content.autoclear{font-family:" + fontFam + ";font-size:105% !important;}" 
+ ".viewThisFeed{font-family:" + fontFam + ";}"
+ ".entry-title i{font-family:" + fontFam + ";}"
+ ".entry-title-text{font-family:" + fontFam + ";}"
+ "#smartreader-feeds-headerTop h3{font-family:" + fontFam + "; font-style: normal;font-variant: normal;font-weight: bold;font-size: 17px;line-height: normal;}"
+ "#smartreader-feeds-headerEdit a{font-size: 9px !important;}"
+ "div.groupItems-title {height: 30px;line-height: 30px;background: none repeat scroll 0% 0% rgb(229, 229, 229);color: rgb(0, 0, 0);font-family:" + fontFam + ";font-size:1.3em !important;padding-left: 10px;}"
+ "#smartreader-feeds-selectionActions .icon > .img {width: 122px;}"
;


//+ ".entry-header.entry-innerTitle{font-family:" + fontFam + ";color: rgb(0, 0, 255);font-weigh(0,0,0);bold;font-size: 18px !important;}" 
//+ ".entry-body.entry-header.autoclear.entry-innerTitle.onClickCloseEntry{color:rgb(255, 0, 255);bold;font-size: 18px !important;}" 


GM_addStyle(cssString);






