// ==UserScript==
// @name          Audiofanzine - Audiofanzine Forum Enhancer 2
// @description   Remove adblock alert, insides ads and other stuff
// @author        Shamk
// @version       1.3.2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @include       http://*.audiofanzine.com/*
// @include       https://*.audiofanzine.com/*

// ==/UserScript==


$("#logo").css("height", "62px");
$("#logo").css("top", "32px");

$("#left").remove();
$("#topbar .content .left").css("left", "0px");
$("#topbar .content .left").css("position", "fixed");

$("#topbar .content .right").css("right", "0px");
$("#topbar .content .right").css("position", "fixed");

$("#fb-root").remove();
$("#topbar").css("top", "0px");
$("#wrapper").css("padding-top", "10px");
$("#wrapper").css("width", "inherit");


// footer remover
$("footer").remove();

// Forum full screen
$("div#mainContent").attr("id", "");

// Remove annoying ads
$("[id^='lbc']").remove();
$("[id^='lbr']").remove();
$("[id^='lbc']").remove();
$("#noAdvButton").remove();
$("aside").remove();
$("div:contains('AdBlock')").remove();
$("#index-bottom").remove();
$(".playlist-row-ad").remove();

$("[class^='sponsored']").remove();
$("[id^='sponsored']").remove();
$("[class$='sponsored']").remove();
$("[id$='sponsored']").remove();


// Remove social
$("#index-social").remove();
$(".share-boxes-static").remove();
$(".shareboxesStaticRight").remove();
$("[class^='share']").remove();

$("#page-navigation-icons").remove();

$(".left-block").css("width", "inherit");