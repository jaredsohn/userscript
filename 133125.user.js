// ==UserScript==
// @name        Google+ Hover Zoom Bugfix
// @namespace   yukiguo.public.googleplus
// @description Google+ Hover Zoom Bugfix
//		When use Google+ Hover Zoom 1.7 up.
//		Fix the big picture open delay and cant be close.
// @include     https://plus.google.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.8
// ==/UserScript==

$(function(){
    $('#hoverzoom').mouseleave(function(){$(this).hide(); });
}).scroll(function(){
    $('#hoverzoom').hide();
});