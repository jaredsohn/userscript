// ==UserScript==
// @name       link naar local storage pagina
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @match      http://kw1c.nl/
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {  
    $('#ulHeaderLinks').append('<a href="https://papp.kw1c.nl">local storage</a>');    
});
