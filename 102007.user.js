//
// ==UserScript==
// @name          Reports Cleanup
// @namespace     namespace
// @description   Narrows Surveys display
// @include       http://fp01*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('table[cols="10"] tr td:eq(1)').remove()