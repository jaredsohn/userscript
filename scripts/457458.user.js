// ==UserScript==
// @name            Hack Forums - Turn OMC addresses into blockchain links
// @namespace       Snorlax
// @description     This will turn all Omnicoin addresses into links which will link to the blockchain
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

var rgx = new RegExp(/(o[1-9A-Za-z]{33})/g);

$('*').contents().filter(function () {
    return this.nodeType === 3;
}).each(function () {
    $(this).replaceWith($(this).text().replace(rgx, '<a class="address" target="_blank" href="http://omnicoinexplorer.com/address/$1">$1</a>'));
});