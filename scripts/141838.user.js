// ==UserScript==
// @name         Cleaner Escapist
// @namespace    http://zanloy.com/scripts/js/
// @version      0.1
// @description  enter something useful
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match        http://*.escapistmagazine.com/*
// @copyright    2012+, Zan Loy
// ==/UserScript==

$("#top_site_part").remove();
GM_addStyle("#main_column { float: none; width: auto; margin-right: 40px; }");
GM_addStyle("#main_column #content { width: auto; }");
GM_addStyle("#video_player_object { width: 970px ! important; height: 590px ! important; }");
$(".fb_iframe_widget").remove();
$(".footer").remove();
$(".site_panel").remove();
$("#related_video_panel").remove();
$("#right_column").remove();
$("#footarpop").remove();

// Destroy advertising scripts (Does this do anything after the entire DOM is loaded? Maybe not, but I'll do it just the same.)
$("script").remove();
