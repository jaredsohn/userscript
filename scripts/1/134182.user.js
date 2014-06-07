// ==UserScript==
// @name         Full Screen with chat for Semak84
// @namespace    fullscreentwitchsemak84
// @include      http*://*twitch.tv/semak84*
// @author       tomt610
// ==/UserScript==

function main() {
var player_column = document.getElementById('player_column');
var standard_holder = document.getElementById('standard_holder');
var chat_lines = document.getElementById('chat_lines');
var live_site_player_flash = document.getElementById('live_site_player_flash');
var wrapper = player_column.parentElement;
wrapper.style.width = '1870px';
player_column.style.width = '1560px';
standard_holder.style.width = '1560px';
standard_holder.style.height = '906px';
chat_lines.style.maxHeight = '815px';
chat_lines.style.height = '815px';
live_site_player_flash.style.width = '1560px';
live_site_player_flash.style.height = '906px';
}

window.onload = main;