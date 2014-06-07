// ==UserScript==
// @name           Kronos MCAnime - Desactivar reproductores de YouTube
// @namespace      MetalTxus
// @match          http://kronos.mcanime.net/*
// ==/UserScript==

$(document).ready(function() {
    $('object[data^="http://www.youtube.com"]').each(function(i, element) {
        $(element).prev().remove();
        $(element).replaceWith('<a target="_blank" href="' + $(element).attr('data') + '"><img style="height:24px; padding-top:4px;" src="https://www.youtube.com/yt/advertise/medias/images/yt-advertise-whyitworks-playbutton.png"></a>');
    });
});