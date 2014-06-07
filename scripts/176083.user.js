// ==UserScript==
// @name       Header NK Hide
// @version    0.2
// @match      http://ninjakiwi.com/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$("div.header-bar, #header").animate({top:"-56px"},0);
$("#content").animate({marginTop:"0"},0);
$("a.show-header").animate({top:"-15px"},0);