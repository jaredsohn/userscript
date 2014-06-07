// ==UserScript==
// @name       FFnet Click & Highlight
// @include	   https://www.fanfiction.net/s/*
// @namespace  FFnet Click & Highlight
// @version    0.1
// @description Allows you to click and highlight text from any fanfiction.net story. Currently they disable this functionality on purpose, this re-enables it.
// @copyright  2012+, Touma
// ==/UserScript==

$(document).ready(function() {
    $('#storytextp').attr('style', 'padding: 0px 0.5em; -webkit-user-select: all !important;');
});