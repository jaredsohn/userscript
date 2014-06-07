// ==UserScript==
// @name          ThePirateBay - Filmweb
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var title = $('#title').text() ;

$('#title').html(title+' <a href="http://localhost/roboczy/thepiratebay-filmweb/script.php?name='+title+'" target="_blank">filmweb</a>') ;