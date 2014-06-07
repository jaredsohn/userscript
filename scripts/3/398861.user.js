// ==UserScript==
// @name       Rooster cache
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description  enter something useful
// @match      https://papp.kw1c.nl/app_medewerkers/docentenroosters/index.aspx
// @copyright  2012+, You
// ==/UserScript==

jQuery(document).ready(function() {
	
    $('body').prepend('<button id="save-link" name="myButton">Save rooster local</button>');    
    
    $('#save-link'). click( function() {
        localStorage['rooster'] = $('.tabelRooster').html();       
    });

});