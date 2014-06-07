// ==UserScript==
// @name       Auto Check Reddit Search Restriction Box
// @match      http://www.reddit.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$("input[name='restrict_sr']").prop('checked', true);
