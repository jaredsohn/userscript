// ==UserScript==
// @name           ThePirateBay colour favorite torrents
// @description    colour your favorite torrent name, edit as you wish
// @version        2.0
// @include        *thepiratebay.*
// @require     http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==
$('#searchResult > tbody > tr > td').filter(function () {
    return /Office|Bag/.test(this.innerText);
}).closest('tr').css('background-color', '#40E0D0');