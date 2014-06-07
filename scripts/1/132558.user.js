// ==UserScript==
// @name 	HentaiFromHell Hotkeys
// @namespace 	hentaifromheaven
// @description Enable left and right keys on hentaifromhell to change pages
// @version 	1.0
// @include 	http://gallery*.hentaifromhell.net/*/showimg.php?c=*
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).bind('keydown', function(e) {
    if(e.which == 37) {
        $('a').each(function() {
            if($(this).text() == 'Previous Page') {
                window.location.href = $(this).attr('href');
            }
        });
    }else if(e.which == 39){
        $('a').each(function() {
            if($(this).text() == 'Next Page') {
                window.location.href = $(this).attr('href');
            }
        });
    }
});