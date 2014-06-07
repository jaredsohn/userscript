// ==UserScript==
// @name       NZBgeek for Trakt
// @namespace  http://nzbgeek.info
// @version    1.0BETA
// @description  Trakt.tv Page Mod for NZBGeek
// @include      http://trakt.tv/show/*
// @include      http://trakt.tv/movie/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @copyright  2013, uwhtp
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
$('.external-links').append('<a href="https://01100111011001010110010101101011.info/series?title='+ Name +'" rel="external" class="button external last" target="_blank">NZBGeek</a>');
}

else if ( document.location.href.indexOf('/movie/') > -1 ) {
var FullName = $('#below-header > h2').html();
var pattern = /^(.+) \((\d{4})\) $/;
var matches = FullName.match(new RegExp(pattern));
var Name = matches[1];
var Year = matches[2];
$(".button.external.last").remove();
$('.external-links').append('<a href="https://01100111011001010110010101101011.info/movies?title='+ Name +'&year='+ Year +'" rel="external" class="button external last" target="_blank">NZBGeek</a>');
};