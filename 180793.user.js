// ==UserScript==
// @name        Tatort Full
// @namespace   daserstetatortfull
// @description Views the Tatort serie in a full screen.
// @author      PumaDias
// @homepage    http://userscripts.org/users/536641
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.0
// @include     http://www.daserste.de/unterhaltung/krimi/tatort/sendung/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$('.av-playerContainer').css('height', '100%').css('width', '100%');
$('.tv').fadeOut(2000);
setTimeout(function() {
    $('.av-playerContainer').insertBefore('.tv');
    setInterval(function () {$('.av-playerContainer a').click();}, 400);
},2000);