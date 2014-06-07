// ==UserScript==
// @name        Digitalhome cleanup
// @namespace   http://userscripts.org/users/435885
// @include     http://www.digitalhome.ca/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// ==/UserScript==


$("table.tborder").has("div.smallfont:contains('Advertisement')").remove();
