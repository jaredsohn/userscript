// ==UserScript==
// @name           Chowhound - Remove top bar
// @description    Gets rid of the top bar.
// @namespace      http://bitkickers.blogspot.com/
// @include        http://chowhound.chow.com/*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

// hide the following DIVs by ID
$("#chow_header").hide();
$("#holiday_eyebrow").hide();
$("#leaderboard_wrapper").hide();
$("#boards_tab_container").hide();
$(".boards_menu_container").hide();