// ==UserScript==
// @name           nabbleCustomCSS
// @namespace      nabble2
// @description    custom css
// @require 	   http://code.jquery.com/jquery-1.6.2.min.js
// @include        http://*.nabble.com/*
// ==/UserScript==
$('body').css('background', '#fff');
$('body').css('color', '#000');

$('a:link,a:hover').css('background', '#fff');
$('a:link,a:hover').css('color', '#000');

$('.nabble').css('background', '#fff');
$('.nabble').css('color', '#000');

$('.nabble .no-bg-color').css('background', '#fff');
$('.nabble .no-bg-color').css('color', '#000');

$('.nabble table').css('background', '#fff');
$('.nabble table').css('color', '#000');

$('.info-message th').css('background', '#fff');
$('.info-message th').css('color', '#000');