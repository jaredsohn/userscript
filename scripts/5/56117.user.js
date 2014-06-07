// ==UserScript==
// @name          Picnik - Remove Ad
// @namespace     http://vasquezparra.co.cc
// @description	  Removes the ad on Top of Picnik and expands whole site to full browser width.
// @author        VasquezParra
// @homepage      http://vasquezparra.co.cc
// @include       http://*.picnik.com/*
// ==/UserScript==

var style = document.createElement("style");
document.getElementsByTagName("head")[0].appendChild(style);
var sheet = style.sheet;
sheet.insertRule("#flashcontent {top:0 !important;height: 100% !important;}", 1000); 
sheet.insertRule("#ifrmLeaderboard {display:none !important;}", 1001); 
sheet.insertRule("#picnik {height: 100% !important;}", 1002); 

 

