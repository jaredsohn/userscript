// ==UserScript==
// @name       Google Calendar colored weekends
// @namespace  http://www.jasonrcurtis.com/
// @version    0.2
// @description  Highlights weekend days in Google Calendar
// @copyright  2013, CC license
// @include https://www.google.com/calendar/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


var setColors = function(){
    $(".wk-dayname:contains('Sat')").css("background-color", "lightgreen");
    $(".wk-dayname:contains('Sun')").css("background-color", "lightgreen");

    $(".mv-dayname:contains('Sat')").css("background-color", "lightgreen");
    $(".mv-dayname:contains('Sun')").css("background-color", "lightgreen");
}

$(document).ready(function() {
    setInterval(setColors,200);
});