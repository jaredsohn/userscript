// ==UserScript==
// @name       verkadefabriek mobile programma
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @match      http://www.verkadefabriek.nl/programma/*/all
// @copyright  2012+, You
// ==/UserScript==


$(document).ready(function() {
    
	var shows = $('#js_datum_shows-holder').clone();
    
    $('body').children().remove();
    
    $('body').append(shows);

    $('#js_datum_shows-holder').css({ width: '90%', margin: '0 auto', background: '#fff'});
    $('body').css({background: '#fff'});
});
