// ==UserScript==
// @name NewtorR block AD
// @version 1.0
// @namespace http://www.w3.org/1999/xhtml
//
// @description NewtorR блокируем рекламу
// @include http://newtorr.org/*
// @include http://*.newtorr.org/*
// @exclude http://*.forum.newtorr.org/*
// @exclude http://forum.newtorr.org/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$("div.flash").remove();
$("a.global-link").remove();
$("div.left-a").remove();
$("div.right-a").remove();
$("body").css("background", "none");
$("div#main-wrapper").css("margin", "0 auto 0");
$("div#main-wrapper").css("width", "auto");