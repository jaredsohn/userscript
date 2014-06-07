// ==UserScript==
// @name           NoRedLetters
// @description    Removes the Red letters from biblia
// @namespace      http://*biblia.com/*
// @include        http://*biblia.com/*
// ==/UserScript==
var NoRedLettersStyle = document.createElement('style');
NoRedLettersStyle.type='text/css';
var s = '.resource-content .words-of-christ { color: #000; } ';
s = document.createTextNode(s);
NoRedLettersStyle.appendChild(s);
var headID = document.getElementsByTagName("head")[0];
headID.appendChild(NoRedLettersStyle);

