// ==UserScript==
// @name			Grinch FP FIXED
// @description		        Makes snow go away
// @include			http://www.facepunch.com/*

// ==/UserScript==
$(document).ready(function() {
    setTimeout("$('canvas').css('visibility','hidden');",5000);
});