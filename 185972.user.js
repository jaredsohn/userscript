// ==UserScript==
// @name        Steam Market Accept SSA
// @author      SheeEttin <sheeettin@gmail.com>
// @namespace   http://use.i.E.your.homepage/
// @version     1.0
// @description Auto-checks the box to accept the Steam Subscriber Agreement when buying items on the Steam Community Market or selling from your inventory
// @match       http://steamcommunity.com/*
// @copyright   2013 SheeEttin
// ==/UserScript==

$(function() {
    $('market_sell_dialog_accept_ssa').checked = true;
    $('market_buynow_dialog_accept_ssa').checked = true;
})();