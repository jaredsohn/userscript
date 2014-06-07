// ==UserScript==
// @name       Trakt External Button (BTN, RuTracker)
// @namespace  http://fluffme.ru
// @version    0.2
// @description  Insert link to tracker search on trakt.tv pages
// @include      http://trakt.tv/show/*
// @include      http://trakt.tv/movie/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @copyright  2013, Fluff
// ==/UserScript==

if ( document.location.href.indexOf('/show/') > -1 ) {
var FullName = $('#below-header > h2').html();
    if ( FullName.match(/a href/) ) {
        var pattern = />(.+)</;
        var matches = FullName.match(new RegExp(pattern));
    	var Name = matches[1];
        }
    else {
        var Name = FullName;
    }
    
$(".button.external.last").attr('class', 'button external');
$('.external-links').append('<a href="https://broadcasthe.net/series.php?name='+ Name +'" rel="external" class="button external last" target="_blank">BTN</a>');
}

else if ( document.location.href.indexOf('/movie/') > -1 ) {
var FullName = $('#below-header > h2').html();
var pattern = /^(.+) \((\d{4})\) $/;
var matches = FullName.match(new RegExp(pattern));
var Name = matches[1];
var Year = matches[2];
$(".button.external.last").remove();
$('.external-links').append('<a href="http://rutracker.org/forum/tracker.php?nm='+ Name + ' '+ Year +' Eng" rel="external" class="button external last" target="_blank">RuTracker</a>');
};