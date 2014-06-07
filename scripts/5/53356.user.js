// ==UserScript==
// @name       Ebay-Location-Route
// @namespace  ebayk
// @description Adds a link for the item location on google maps 
// @include     http*://www.ebay.*/itm/*
// @require     //ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version    1.0
// author: knoe
// ==/UserScript==


//Configuration:
var home =  'Münster, Germany';

$(function (){var dest = $("#itemLocation .iti-eu-bld-gry").html();$("#itemLocation .iti-eu-bld-gry").html('<a href="http://maps.google.com/maps?saddr='+ encodeURI(home)+'&daddr='+encodeURI(dest)+'">'+dest+'</a>')});
