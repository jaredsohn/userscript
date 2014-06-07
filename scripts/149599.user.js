// ==UserScript==
// @name       Ek$i Sozluk Beta Beautifier
// @namespace  http://soultemple.net
// @version    0.1.35
// @description  Beta'yi alir dogru duzgun hale getirir. That all. Oyle fancy $eyler falan beklemeyin
// @match      http://beta.eksisozluk.com/*
// @copyright  2012+, falan filan © ekliiim bide. Calmayin cocuuum calan ibnedir, toptur, ta$$aksizdir.
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$('#aside').remove();
$('#content-section').css("width","1000px");
$('#top-bar').css("background-color","#CCC");
$('body').css("background-color","#CCC");
$('body a').css("color","navy");
$('#content-section').css("background-color","#CCC");
$('#advanced-search-form').css("background-color", "#CCC");
$('.edittools').css("padding", "5px");
$('#index-section').css("background-color","#CCC");
$('.share-dialog').css("background-color","#CCC");
$('.dropdown .dropdown-menu').css("background-color", "#CCC");
$('#in-topic-search-options').css("background-color", "#CCC");
$('#message-send-form').css("background-color", "#CCC");
$('.ui-autocomplete').css("background-color", "#CCC");