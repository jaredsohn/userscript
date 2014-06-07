// ==UserScript==
// @name        MyAnimeList Custom CSS Override
// @namespace   co.wiles
// @description Replaces custom CSS on other people's anime list with your own.
// @include     http://myanimelist.net/animelist/*
// @exclude     http://myanimelist.net/mangalist/*
// @version     1
// @grant       none
// ==/UserScript==

var name = $('#mal_cs_listinfo').find('strong:last').text();

if(name){
 $('style:first').load('/animelist/' + name + ' style:first');
}