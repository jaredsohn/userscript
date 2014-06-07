// ==UserScript==
// @name           FF Link
// @namespace      Serkan Algur
// @description    FF Link
// @include        http://friendfeed.com/*
// ==/UserScript==

$(window).bind('keyup',function(e) {
 if ( e.keyCode == 49 ) {
         window.location.href = $('.l_share').attr('href');
 }
 if ( e.keyCode == 50 ) {
         window.location.href = $('.l_comment').attr('href');
 }
 if ( e.keyCode == 97 ) {
         window.location.href = $('.l_like').attr('href');
 }
});