// ==UserScript==
// @name        IPTorrents Torrent-Page-Title-r
// @namespace   TyrannoSatan
// @description Makes IPTorrents Title Better
// @include     http*iptorrents.com/details*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @grant       GM_log
// ==/UserScript==

var newTitle = $(".ac.td_fname").text();
newTitle = newTitle + "@ IPTorrents";
document.title = newTitle;