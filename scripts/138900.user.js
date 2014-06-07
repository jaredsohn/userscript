// ==UserScript==
// @name           improved swagbucks 
// @namespace      alexismejias.com
// @include        http://*swagbucks.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$("#sponsoredLinks_Top, #slider-outer").remove();
var  v= $('#field').val();
v = encodeURI(v);
$('.ads_top_title').after('<a href="http://www.google.com/search?hl=en&q='+v+'">Search in Google</a>').after('<a href="http://duckduckgo.com/?q='+v+'">Search DuckDuckGo</a>');
