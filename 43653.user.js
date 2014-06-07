// ==UserScript==
// @name           Twitter Search Box
// @namespace      http://www.martinaberastegue.com
// @description    Adds the search form to the Twitter pages, based on Daniel X Moore search userjs.
// @include        http://twitter.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

$('#navigation').append('<ul style="display:inline;height: 16px"><li><form method="get" action="http://search.twitter.com/search">Search: <input type="search" name="q" /></form><li></ul>');