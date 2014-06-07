// ==UserScript==
// @name kongregate changer!
// @namespace tag://kongregate
// @include http://www.kongregate.com/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(“#home_page_feed”).html("")//.css(“width:500;;
$(”#home_page_feed").append(’’).children(“#recent”).load(“http://www.kongregate.com/accounts/onlyantiidle/recently-played .category_games_listing .callout_listing”, function(){ });