// ==UserScript==
// @name       Trello: Show number of cards 
// @version    0.1
// @description  show the number of cards in trello for each board
// @match      https://trello.com/board/*
// @copyright  2012+, Abdulkareem Alabdulkareem
// ==/UserScript==
    for(var i = 0; i < document.getElementsByClassName('num-cards').length; i) {
        document.getElementsByClassName('num-cards')[i].className= 'hide-on-edit';}