// ==UserScript==
// @name        Werkspot Cookie Notice Deleter
// @namespace   CookieFoetsie
// @grant       none
// @include     http://www.werkspot.nl/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

$("fhCookieLaw bottom").parent().remove();