// ==UserScript==
// @name           Craiglist Search Fix
// @include      http://*.craigslist.org/*/*
// @description    Moves the Craigslist search bar to a fixed location at the right of the screen. This allows for easier searching no matter where on the page you're located.
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//Apply IDs and classes to elements
$("blockquote").eq(0).attr("id","searchbox");
$("#searchtable").children("tbody").children("tr").each(function(){$(this).addClass("searchRow");});
$(".searchRow").children("td").css("text-align", "left");

//Add styles to header
$("head").append('<style type="text/css"> #searchbox {margin: 0; position: fixed;top:45px; right: 15px; width: 300px;} fieldset *{ clear: left; float: left;} #searchlegend *{float: none} #searchlegend{margin-bottom: 5px;} .min, .max{float: none; margin:0 0 15px 5px} #query{margin: 0 10px 10px 0} .searchrow input[type="submit"]{ margin: 10px 0 10px 0;} .searchrow label{clear: none;}</style>');