// ==UserScript==
// @name	Komixxy.pl Hotkeys
// @namespace	korn36
// @description	Dodaje skróty klawiaturowe na stronie komixxy.pl... F6 - Losowanie komixxu, F7 - Poprzedni komixx, F8 - Następny Komixx, F9 - Wyświetlanie/Ukrywanie komentarzy
// @include	*://komixxy.pl/*
// @include	*://komixxy.pl
// @require	http://code.jquery.com/jquery-1.7.2.min.js
// @require	http://dl.dropbox.com/u/14242104/js/jquery.hotkeys.js
// @version	0.1
// @author	korn36
// ==/UserScript==

$(document).bind('keydown', 'f6', function (evt){
    window.location.href = 'http://komixxy.pl/losuj'; 
    evt.stopPropagation( );  
    evt.preventDefault( );
    return false;
});

var next = $("#next_pic_button_area").children().attr('href');
var prev = $("#prev_pic_button_area").children().attr('href');

$(document).bind('keydown', 'f7', function (evt){
    window.location.href = prev; 
    evt.stopPropagation( );  
    evt.preventDefault( );
    return false;
});

$(document).bind('keydown', 'f8', function (evt){
    window.location.href = next; 
    evt.stopPropagation( );  
    evt.preventDefault( );
    return false;
});;

$(document).bind('keydown', 'f9', function (evt){
    show_comments(picid)
    evt.stopPropagation( );  
    evt.preventDefault( );
    return false;
});;