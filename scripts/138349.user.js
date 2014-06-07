// ==UserScript==
// @name        Cleaner Engadget
// @namespace   http://zanloy.com/scripts/js/
// @version     1.7
// @downloadURL https://zanloy.com/scripts/js/cleaner_engadget.user.js
// @updateURL   https://zanloy.com/scripts/js/cleaner_engadget.user.js
// @description Cleans up elements from Engadget.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match       http://*.engadget.com/*
// @copyright   2012+, Zan Loy
// ==/UserScript==

// User Options
var floatImages = true;
var hideComments = true;
var relink = true;

// Changelog:
// v1.7: Engadget changed their page format, adjusted accordingly
// v1.6: Small tweaks and added relinking to prevent opening excessive tabs
// v1.5: Added ability to collapse/expand comments instead of just static removal
// v1.4: Wrote the whole thing to use jquery for faster processing and better legibility
// v1.3: Fixed issue where Chrome natively stopped working
// v1.2: Made some changes to get the script to work with Chrome natively
// v1.1: Fixed bug that didn't float images correctly
// v1.0: First Version

// Header
$("#ajaxbanner").remove();
$("#carousel").remove();

// Content
GM_addStyle(".post-body { width: auto ! important; }");
GM_addStyle(".post-meta { float: none ! important; width: auto ! important; }");
if(floatImages) { GM_addStyle(".post_body a img { float: left ! important; margin-right: 25px ! important; }"); }
$("#comments").before("<div style='text-align:center;'><span style='color:#00BDF6;cursor:pointer;' onClick='$(\"#comments\").toggle();'>Show/Hide Comments</span></div>");
if(hideComments) { $("#comments").hide(); }
$(".nocontent").remove();
GM_addStyle("#body { width: auto ! important; }");
GM_addStyle("#gdgt-wrapper { width: auto ! important; }");

// Destroy advertising scripts (Does this do anything after the entire DOM is loaded? Maybe not, but I'll do it just the same.)
$("script").remove();

// Relink everything to open in current window/tab.
if(relink) { $("a").attr("target", "_top"); }