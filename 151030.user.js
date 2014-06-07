// ==UserScript==
// @name         No Watched on YouTube
// @namespace    http://qwerty.org.il
// @version      0.1
// @description  Remove the videos marked as 'watched' from your subscription list
// @match        http://*.youtube.com/*
// @copyright    2012+, Tzachi Noy
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$(function(){
    $(".feed-page li:has('.feed-thumb-watched')").empty();
});
//todo: add support for 'load-more' button