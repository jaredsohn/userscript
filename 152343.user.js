// ==UserScript==
// @name        Ultoo Poll Trick 2 By Rahul Chaudhary[ultimatesmsapi.tk]
// @namespace   http://ultimatesmsapi.tk/tricks/pollAns.user.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include     http://www.ultoo.com/*
// @include     http://sms.ultoo.com/*

// @include     http://ultoo.com/*
// @version     1.0
// ==/UserScript==
$(function(){
		var button = $("div.button_small").children("a").attr("href");
		window.location.href = button;
});