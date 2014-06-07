// ==UserScript==
// @name       Tumblr Text Reblog
// @namespace  something here idk
// @version    0.1
// @description  New Tumblr Text Reblog
// @require	http://www.w3schools.com/jquery/jquery.js
// @include http://*.tumblr.com/*
// @copyright  2013+, fallenfirebender
// ==/UserScript==
$(document).ready(function(){
 var _href = $('a[href*="reblog"]').attr("href");
 var components = _href.split('?');
 var start = components[0];
 $('a[href*="reblog"]').attr("href", start + '/text');
});
