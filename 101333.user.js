// ==UserScript==
// @name           animefreak tidy up
// @namespace      http://userscripts.org/users/304720
// @description    clean up the animefreak website and remove the ads.
// @include        http://www.animefreak.tv/
// @include        http://www.animefreak.tv/*
// @include        http://www.animefreak.tv/watch/*
// @require http://jqueryjs.googlecode.com/files/jquery-1.3.js
// ==/UserScript==
document.getElementById("Reklam").style.display = "none";
document.getElementById("edit-search-theme-form-1").style.border = "solid 1px black";
$(document).ready(function() {
$(".menu li a").css({"color":"blue"})
$(".menu li a,.path p a").mouseover(function() {
$(this).css({"border":"none","background-color":"white","text-decoration":"underline","color":"blue"})
});
$("ul.menu li a,.path p a").mouseout(function() {
$(this).css({"text-decoration":"none"})
});
$(".rtecenter").hide();
$("p iframe").hide();
$("table iframe").hide();
$(".blockcontent a img").hide();
$(".blockcontent").css("background-image", "url(http://www.hrweekly.co.uk/ESW/Images/white.gif)");
$(".defaultblock").css("background-image", "url(http://www.hrweekly.co.uk/ESW/Images/white.gif)");
$(".blockcontent:eq(2)").hide();
$(".blockcontent:eq(3)").hide();
$(".defaultblock:eq(2)").hide();
$(".defaultblock:eq(3)").hide();
$(".path span").hide();
});