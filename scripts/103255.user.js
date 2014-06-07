// ==UserScript==
// @name block the rock
// @namespace 4chan
// @description Block "the rock says" on 4chan
// @include http://boards.4chan.org/b/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

jQuery(document).ready(function(){
$(".postarea embed").attr('src', '');
});