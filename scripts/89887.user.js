// ==UserScript==
// @name          Tag this photo id
// @description   this is just a personal tool
// @include       *facebook.com*photo.php?fbid=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(".tagging_link").each(function(){$(this).attr('id', 'fblol');)};