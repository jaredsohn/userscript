// ==UserScript==
// @name         clan online
// @version      1.0
// @include      http://*.sofiawars.com/clan/profile/
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==

var clan_online = $('i.online').length;

$('div.clan-members>h3').append(" / Онлайн ("+clan_online+")"); 
