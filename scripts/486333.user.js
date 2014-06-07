// ==UserScript==
// @name        TNC Tab
// @namespace   conquer club
// @description Script for Conquer Club, it puts a TNC forum link into the navbar
// @include     http*://*conquerclub.com/*
// @include     http*://*beta.conquerclub.com/*
// @exclude     http*://*conquerclub.com/api.php*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() {
   
    // Do the magic ;)
	
    $('#mainNav').append('<li><a href="http://www.conquerclub.com/forum/viewforum.php?f=558">TNC</a></li>');
});