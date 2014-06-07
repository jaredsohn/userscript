// ==UserScript==

// @name          Google Calendar minimal style

// @namespace     Google.Calendar.MinimizeInterface

// @description   Hides all unnecessary areas in Google Calendar.

// @include       https://www.google.com/calendar/render

// @include       https://www.google.com/calendar/render/*

// ==/UserScript==


if (typeof jQuery != 'undefined') {
$(function() {
    $('#onegoogbar').css('display', 'none');
    $('div#nav').css('display', 'none');
  });
}

