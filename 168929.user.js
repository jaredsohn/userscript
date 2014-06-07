// ==UserScript==
// @include     http://forum.astrofili.org/*
// @require http://code.jquery.com/jquery-1.10.0.min.js
// @namespace http://forum.astrofili.org/linkgrabber
// @name forum.astrofili.org linkgrabber
// @description   opens link external to domain forum.astrofili.org in a new tab/window
// ==/UserScript==
$(document).ready(function() {
   $("a:not([href^='http://forum.astrofili.org'],[href^='forum.astrofili.org'],[href^='./'])").attr('target','_blank');
});