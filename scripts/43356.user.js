// ==UserScript==
// @name           Twitter Search
// @namespace      http://strd6.com
// @description    Adds search form to header of Twitter pages
// @include        http://twitter.com/*
//
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

$('#header').append('<form method="get" action="http://search.twitter.com/search"><div id="searchEntry">Search:<input type="search" name="q" /></div></form>');