// ==UserScript==
// @name        Trello Card Numbers
// @namespace   https://github.com/elfdragore
// @description Shows trello card numbers
// @match       https://trello.com/*
// @match       https://*.trello.com/*
// @version     1
// @grant       none
// ==/UserScript==

setInterval(function(){
    $( ".card-short-id.hide" ).removeClass( "hide" );
    $( ".list-header-num-cards.hide" ).removeClass( "hide" );
},3333);
