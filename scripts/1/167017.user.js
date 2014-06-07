// ==UserScript==
// @name        MediaLeech - ThePirateBay plugin
// @namespace   com.medialeech.thepiratebay
// @description Leech Torrents From ThePirateBay in OneClick
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include     https://thepiratebay.sx/*
// @include     http://thepiratebay.sx/*
// @grant       none
// @version     1
// ==/UserScript==

$('a[href^="magnet:"]').each(function(){
    $(this).parent().find('a[href^="magnet:"]').before($('<a/>')
    .attr('href','http://medialeech.ir/me/#dl:'+$(this).attr('href'))
    .attr('title','Leech With MediaLeech')
    .css('background','none')
    .html('<img src="http://medialeech.ir/images/plugin_icon.png" style="height: 16px;"/>'))
    });