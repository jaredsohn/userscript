// ==UserScript==
// @name Wimba jump
// @version 1.1
// @description Jump to a different times in a Wimba presentation. enter time as MINS:SECS
// @namespace http://userscripts.org/users/121730
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include http://*.wimba.com/main/*
// ==/UserScript==

$(document).ready(function() {
  $('span#feedback').parent().append('<div><input id="jump-time" type="text"><button id="jumper" type="button">Jump</button></div>');
  $('#jumper').click(function() {
    var time = $('#jump-time').val().split(':');
    var mins = parseInt(time[0]);
    var secs = parseInt(time[1]);
    var milli = "" + (((mins * 60) + secs) * 1000);
    chooseThis(current_chosen, milli);
  });
});
