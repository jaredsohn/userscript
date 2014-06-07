// ==UserScript==
// @name           ik_nobirds
// @namespace      ikariam.ru
// @include        http://s*.*.ikariam.com/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
   $('.animated_bird').remove();
   $('.bird_sw').remove();
   $('.bird_swarm').remove();
});