// ==UserScript==
// @name           Kronos MCAnime - Mostrar reproductores de YouTube dentro de spoilers
// @namespace      MetalTxus
// @match          http://kronos.mcanime.net/*
// ==/UserScript==

function hidePlayers() {
    $('object[data^="http://www.youtube.com"]:not(.spoiled)').each(function(i, element) {
        $(element).prev().remove();
        $(element).before('<div style="text-align:center;" class="pComment-item">' +
                          '<img height="24" src="http://techwhack.co/wp-content/uploads/YouTube-Logo.png">' +
                          '</div>');
        $(element).prev().click(function() {
            $(element).toggle();
        });
        $(element).hide();
        $(element).addClass('spoiled');
    });
}

$(document).ready(function() {    
    setInterval(hidePlayers, 2000);
});