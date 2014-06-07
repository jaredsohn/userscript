// ==UserScript==
// @name       Space.com Floating Header Bar Removal Script
// @namespace  http://enut.co
// @version    0.6
// @description  Removes floating bar when you scroll down to browse the articles
// @include        http://*.space.com/*
// @include        http://space.com/*
// @include        http://*.livescience.com/*
// @include        http://livescience.com/*
// @include        http://*.laptopmag.com/*
// @include        http://laptopmag.com/*
// @include        http://*.businessnewsdaily.com/*
// @include        http://businessnewsdaily.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013+, tracerman
// ==/UserScript==

$(".fixed-bar").remove();

for ( var i = 0; i < 5; i++ ) {
    $(".load_more").trigger('click');
}