// ==UserScript==
// @name       TF2R unrumbler
// @version    0.2
// @match      http://tf2r.com/*
// @copyright  _Hans
// ==/UserScript==

$(document).ready(function(){
    $('*').trigger('stopRumble');
    $('object[data=http://flash-mp3-player.net/medias/player_mp3_mini.swf]').remove();
});