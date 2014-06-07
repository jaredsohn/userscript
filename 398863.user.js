// ==UserScript==
// @name       papp kw1c
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @match      https://papp.kw1c.nl/
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {
    
    $('body').append('<table>'+ localStorage['rooster'] +'</table>');    
    });