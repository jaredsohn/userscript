// ==UserScript==
// @name           Facebook Timestamp Fixer
// @description    Replaces the default "x minutes/hours ago" text with the full date/time from the title (hover) text
// @author         Ben Gott
// @namespace      bengott
// @include        https://*.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

function fixTimestamps() {
  $('abbr').each(function() {
    var titleText = $(this).attr('title');
    $(this).html(titleText);
  });
}

$(window).on('load', fixTimestamps());