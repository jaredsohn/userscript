// ==UserScript==
// @name       Habrahabr rating script
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Script that helps to see most rated comments
// @match      http://habrahabr.ru/*
// @copyright  2012+, Dennis Nichoga
// ==/UserScript==
if(document.location.host == "habrahabr.ru"){
	var commentRating = 10;
    $('.score').each(function(x,i){var item = $(i); var sc = parseInt(item.html()); if(sc >= commentRating) { item.parents('.info').css('background-color', '#abffab'); } });
}