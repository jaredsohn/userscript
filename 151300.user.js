// ==UserScript==
// @name        Tweakers.net - Posthistorie + Reacties
// @namespace   userscripts
// @description Add posthistorie and reacties to frontpage and forum tabs
// @include     http://tweakers.net
// @include     https://tweakers.net
// @include     http://tweakers.net/*
// @include     https://tweakers.net/*
// @include     http://gathering.tweakers.net/*
// @include     https://gathering.tweakers.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// @version     1.2.0
// ==/UserScript==



// Do config
// NOTE: Change to your id/name
var userId = 204872;
var userName = 'Redsandro';

// Globals
var historieHref = 'http://gathering.tweakers.net/forum/find/poster/'+userId
var historieLi = '<li><a href="'+historieHref+'">Historie</a></li>';
var reactieLi = '<li><a href="http://tweakers.net/search/?DB=Userreacties&Query='+userName+'">Reacties</a></li>';

// Selectors
var menuLinks = $('div#menu ul:first > li a');
var menuMore = $('div#menu ul:first li:last-child');



// Change forum link to postHistorie link
menuLinks.each(function(i){
    if ($(this).text() == 'Forum')
        $(this).attr('href', historieHref);
});

// Append menu items
// menuMore.before(historieLi);
menuMore.before(reactieLi);

// Remove PRO tab
$('div.pageTabs ul li#tab_frontpage_pro' ).remove();