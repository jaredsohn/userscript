// ==UserScript==
// @name Eksi Mesaj isigi Yakici
// @namespace http://www.eksisozluk.com/ 
// @description Mesaj isiginiz hic sonmesin
// @include     /^https?://www\.eksisozluk\.com/.*$/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript== 
$('a[href=\'/mesaj\']').attr('class', 'new-update');