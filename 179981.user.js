// ==UserScript==
// @name blockBieber
// @namespace http://www.example.com/ juliet/
// @description Blackout words you don't want to see
// @include http://*.wikipedia.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js

// ==/UserScript== 

$(document).ready(function(){
var $div = $(body),
    array = ['yolo','swag','one direction','1D','Justin Bieber'],
    re = new RegExp('\\b('+array.join('|')+')\\b', 'gi'),
    divHTML = $.text().replace(re, "<span class='block'>$&</span>");
$div.html(divHTML);
});
