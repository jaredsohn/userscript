// ==UserScript==
// @name	Spele.nl Meteen spelen
// @version	1.0
// @namespace	Spele@rctgamer3
// @description	Geen last meer van vervelende reclames, balkjes en andere troep, maar gewoon meteen spelen :) !
// @include	http://spele.nl/games/*
// ==/UserScript==
$ = unsafeWindow.jQuery;
$(document).ready(function killPreloader() { 
    unsafeWindow.preloader.end();
    $('#actions .close').css('visibility','hidden');
    $('.baguette').css('display','none');
});
