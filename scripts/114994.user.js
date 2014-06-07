// ==UserScript==
// @name           This will remove sidebar on all pages
// @namespace      http://www.reddit.com/
// @description    This will remove sidebar on all pages
// @include        http://www.reddit.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


$(document).ready(function(){
   $(".side").css("display","none");
});