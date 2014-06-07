// ==UserScript==
// @name           Slashdot - Maximize horizontal space
// @namespace      http://bitkickers.blogspot.com/
// @include        http*://*slashdot.org/article.pl*
// @include        http*://*.slashdot.org/story/*
// @include        http://slashdot.org/story/*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

/* updated for slashddot v3 */

$("aside.view_mode").hide();
$("div.commentBox").hide();
$("nav.left_menu").hide();

//$("#content").removeClass("grid_24");
$("body").css("padding", "0px");
$("#comments").css("margin", "0px").css("margin-left", "1em");
$("#firehose").css("margin-left", "0px");
$(".grid_24").removeClass("grid_24");