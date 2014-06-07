// ==UserScript==
// @name       Google Calendar colored weekends
// @namespace  http://malag.net/
// @version    0.1
// @description  Highlights weekend days in Google Calendar
// @copyright  2013 Erich Roncarolo, GPL license
// @include https://www.google.com/calendar/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function() {
    $('<style>.tg-weekend { background-color: #eeffee } </style>').appendTo($('body'));
});