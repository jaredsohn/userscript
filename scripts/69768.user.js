// ==UserScript==
// @name           ShareIt-link
// @namespace      http://userscripts.org/users/134191
// @include        http://shareit.oltreirc.net/lista/*
// ==/UserScript==
// My first, really simple, Greasemonkey script.
// Released without guarantees, only for educational purposes.

var html = document.getElementById('table5').innerHTML;
var html = html.replace(/t\(\'/gi, "alert('/msg ");
var html = html.replace(/\',\'#/gi, " xdcc send #");
document.getElementById('table5').innerHTML = html;