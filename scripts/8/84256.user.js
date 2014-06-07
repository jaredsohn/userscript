// ==UserScript==
// @name Hello World
// @namespace http://diveintogreasemonkey.org/download/
// @description example script to alert "Hello world!" on every page
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include *
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// ==/UserScript==


$(document).ready(function() {  
        alert("Hello world!");
});

