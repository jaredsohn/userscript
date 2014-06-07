// ==UserScript==
// @name           Google Reader - Maximize Vertical Space
// @description    Gets rid of the Google bar on the top. Ideal for full screen mode. 
// @namespace      http://bitkickers.blogspot.com/
// @include        http://www.google.com/reader*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

// hide the following DIVs by ID
$("#viewer-header-container").hide();
$("#search").hide();
$("#title-and-status-holder").hide();
$("#gb").hide();

$("#entries").css("padding-right", "0px");
$(".lhn-hidden #entries").css("padding-left", "0px");

GM_addStyle(".sharebox { display: none; }");
GM_addStyle(".item-plusone { display: none !important; }");
GM_addStyle("#top-bar { display: none !important; }");

GM_addStyle("#entries.cards .entry { margin: 0px 0px 5px 0px !important;}");
