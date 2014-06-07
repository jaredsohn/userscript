// ==UserScript==
// @name        google-search-font
// @namespace   fazotron
// @description Replace BIG font in Google search results
// @include http://www.google.tld/*
// @include https://www.google.tld/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() { 
    $('<style>a { font-size: 14px; }</style>').appendTo('body'); 
});