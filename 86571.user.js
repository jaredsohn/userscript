// ==UserScript==
// @name           g0v a1000 sunsets style fixer
// @version        1.0.0
// @description    Fixes stylesheets in a1000 diary
// @include http://a1000sunsets.diary.ru/*
// @match http://a1000sunsets.diary.ru/*
// ==/UserScript==
$ = function(selector, style) {var el = document.querySelector(selector); for (var prop in style) {el.style[prop] = style[prop]};}; 
$("#wrapper", {width: "100% !important"}); 
$("#page-c", {width: "75% !important"}); 
$("#side", {width: "25% !important"});
$("#extratop", {marginLeft: "25% !important"});