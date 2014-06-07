// ==UserScript==
// @name			Yes, this is a gift
// @namespace		http://www.doctormckay.com
// @version			1.1.0
// @description		Gets rid of the annoying "Please confirm that you are giving your items away" prompt in Trade Offers
// @match			http://steamcommunity.com/tradeoffer/*
// ==/UserScript==

jQuery('#you_notready')[0].onclick = null;
jQuery('#you_notready').click(function() { g_cTheirItemsInTrade = 1; ToggleReady(true); });

setInterval(function() {
    if(jQuery('#notready_tradechanged_message').is(':visible')) {
        ToggleReady(true);
    }
}, 100);