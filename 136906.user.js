// ==UserScript==
// @name       Chrome Darken books
// @namespace  http://www.forsvunnet.co.uk
// @version    0.1
// @description  Chrome Darken books for readability
// @match      http://books.google.*/*
// @copyright  2012+, Forsvunnet
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
$(document).ready(function(){
    setInterval(function(){
        $("img").each(function(){
            var match = 'http://books.google.no/books?';
            if ($(this).attr('src') && $(this).attr('src').substr(0,match.length) == match ){
                $(this).animate({'opacity': '0.5'}, 1000);
                $(this).parent().css({'background-color':'#000'});
            }
        });
    }, 200);
});