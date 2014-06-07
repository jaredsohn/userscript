// ==UserScript==
// @name          SuperIrr
// @author	  Dollr
// @description   irrelevant-markierte Beiträge geöffnet anzeigen
// @version       0.0.2
// @include       http://www.supertopic.de/forum*.html*
// @include       http://supertopic.de/forum*.html*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



$(function(){

$('.irrelevant:not(:has(a[id^=ig]))').removeClass().addClass('relevant');
$('div[id^=irPosting]').show();
$('.posting a[id^=irLink]').html('verbergen');

});
