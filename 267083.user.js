// ==UserScript==
// @name       Steam Market 1 click buy
// @namespace  http://ehsankia.com
// @version    1.0
// @description  buy items on the market with one click
// @match      http://steamcommunity.com/market/listings/*
// @copyright  2012+, Ehsan Kia
// ==/UserScript==

buttons = document.querySelectorAll('.item_market_action_button_green');
for (var i=0; i<buttons.length; i++){
    href = buttons[i].href;
    buttons[i].href = "#";
    buttons[i].onclick = function(){
        eval(href.split(":")[1]);
        document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
        document.getElementById('market_buynow_dialog_purchase').click();
    }    
}