// ==UserScript==
// @author         ref
// @name           ref
// @namespace      ref
// @description    ref
// @version        0.1
// @include        http://www.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if (0==$('ul.resistance_war').length) {
    location.href = "http://www.erepublik.com/en";
}