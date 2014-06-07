// ==UserScript==
// @name           B92 vesti - color visited links
// @author         Sasa Milosevic
// @namespace      Sasa
// @include        http://*b92.net/*
// @require  	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("<style type='text/css'> a:visited { color: rgb(58, 58, 255) !important;} .section-box a:visited, .leadingboxTop a:visited { color: rgb(220, 220, 240) !important;}</style>").appendTo("head")