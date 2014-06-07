// ==UserScript==
// @name           Kronos MCAnime - Borrar feeds más nuevos al cargar los más viejos
// @namespace      MetalTxus
// @match          http://kronos.mcanime.net/*
// ==/UserScript==

function deleteFeeds() {
    while($('.profile-story').length > 17) {
        $('.profile-story').eq(0).remove();
        window.scrollTo(0, 0);
    }
}

$(document).ready(function() {
    setInterval(deleteFeeds, 2000);
});