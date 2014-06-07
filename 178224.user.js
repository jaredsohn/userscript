// ==UserScript==
// @name           Rad Hello Testing 3
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.boomtownroi.com/*/craigslist/*
// @include        https://post.craigslist.org/*
// @include        http://post.craigslist.org/*
// @include        http://demo.radtechnosolutions.com/*
// @include        http://localhost:16080/*
// @include        http://*.radtechnosolutions.com*
// @require        http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==
alert('Monkey sez... "Hello World!"');
alert(document.getElementById("menuHome").innerHTML);
$(function () {
    $('#navigation ul li a').removeClass('activeMenu');
    $('#menuHome').css('color', '#000000');
    $('#menuHome').click();
});