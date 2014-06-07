// ==UserScript==
// @name    Expand all posts on totalbash.org
// @namespace   http://blog.you-know.org/expand/
// @description This user script expands all posts on totalbash
// @include http://www.totalbash.org/*
// @include http://totalbash.org/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	$('span.beitrag_oben_fade').hide();
	$('div.beitrag_hidden').show();
});
