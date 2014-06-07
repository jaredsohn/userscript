// ==UserScript==
// @name          Filmweb - YouTube
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var title = $('h2.origTitle').text() ;

$('#placeForGPlus').html('<a href="http://localhost/roboczy/thepiratebay-filmweb/filmweb-youtube.php?name='+title+'" target="_blank">youtube trailer</a>') ;