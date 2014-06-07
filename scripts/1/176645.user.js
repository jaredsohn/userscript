// ==UserScript==
// @name     Remove Real Stuff posts
// @match  http://*boingboing.net/*
// @version 0.1
// @copyright 2013, cegev/cge, but released to public domain
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$("div.post:contains('Real Stuff:')").remove();
$("div.features-item:contains('Real Stuff:')").remove();