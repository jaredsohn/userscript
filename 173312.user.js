// ==UserScript==
// @name Steam FastBuy
// @description Visit tikhonex.ru for update
// @author Alexander (Tikhonex) / tikhonex.ru
// @include http://steamcommunity.com/market/listings/*
// ==/UserScript==

        var itemButton = document.getElementsByClassName('item_market_action_button_green');
        itemButton[0].click();
        setTimeout(ssaTrue);

        function ssaTrue()
        {
                document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
        }