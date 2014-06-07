// ==UserScript==
// @name        TwitterBackground
// @namespace   TwitterBackground
// @description view twitter background image
// @include      *twitter.com/*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

$(document).load(function (){
    var twCSS = $('body').css('background-image');
    var bgURL = twCSS.substr(4, twCSS.length-5);
    $("#global-actions").append("<li><a href='" + bgURL + "'>BG IMage</a></li>");
});
