// ==UserScript==
// @name       Jyllandsposten Premium Blocker
// @namespace  http://jppremiumblocker.fdsa.dk/
// @version    0.1
// @description  Block premium articles on jp.dk
// @match      http://jyllands-posten.dk/*
// @copyright  2013+, FDSA
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==


jQuery(document).ready(function($) {
    $(".PremiumBox").remove();
    $("#WeatherBar").remove();
    $(".bigbox").parent().remove();
});