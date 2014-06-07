// ==UserScript==
// @name        OFM AWP Rechner für Transfermarkt
// @namespace   tag://ofm
// @description OFM AWP Rechner für Transfermarkt
// @author      Endlessdeath
// @date        17.04.2013
// @include     http://www.onlinefussballmanager.de/spiel.php
// @include     http://www.onlinefussballmanager.de/010_transfer/transfermarkt.php*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js
// @grant       none
// ==/UserScript==

var levels = [
    0, 183, 352, 525, 769, 1130, 1637, 2310, 3129,
    4001, 4851, 5667, 6481, 7337, 8209
];

var regex = /(\w.+)\s\/\s(\w.+)/;

jQuery('td[width=110]').each(function() {
    regex.exec($(this).html());
    ep = parseInt(RegExp.$1.split('.').join(""));
    tp = parseInt(RegExp.$2.split('.').join(""));
    level = jQuery('font', $(this).prev('td')).html();
    awp = levels[level] - (ep*tp*2)/(ep+tp);
    jQuery(this).html(ep + " / " + tp + " (AWP: " + Math.round(awp) + ")");
});
