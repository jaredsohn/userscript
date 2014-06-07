// ==UserScript==
// @name        grooveshark-arrowkeys
// @namespace   http://turmion.tumblr.com
// @description enable to play next or previous song using the arrow keys
// @include     http://listen.grooveshark.com/*
// @author      turmion@mail.ru
// ==/UserScript==

$(document).ready(function(){
    $(document).keydown(function(event) {
      if (event.which == '37') {
        $('#player_previous').click();
      }else if (event.which == '39'){
        $('#player_next').click();
      }
    });
});