// ==UserScript==
// @name           Twitter saved searches
// @namespace      k(a)isr.hu
// @description    Appends search links to the Twitter sidebar (since saving searches is broken)
// @include        http://twitter.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// These searches will show up in the Twitter sidebar. You can edit/extend the list.
var qz = ['#greasemonkey','#jquery','#younameit'];

function appendSearch(q)
{
  $("ul.saved-search-links").append('<li><a class="search-link" href="http://twitter.com/search?category=saved_search&amp;q='+escape(q)+'&amp;source=sidebar"><span>'+q+'</span></a></li>');
}

$(document).ready(function(){
  qz.forEach(appendSearch);
});

