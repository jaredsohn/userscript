// ==UserScript==
// @name         YouTube Trailers on IMDb
// @namespace    http://agorf.gr/
// @description  Add a link to YouTube trailers on IMDb
// @include      http://www.imdb.com/title/tt*/
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
//
// Copyright (c) 2009, Aggelos Orfanakos
// Licensed under the terms of the MIT license.

q = document.title;
q = q.replace(/ \([0-9\/I]+\)$/, '');
q = q.replace(/[^A-Za-z0-9 ]/g, '');
q = q + ' trailer';
q = q.toLowerCase();
q = escape(q);

$('.link:first').before(
  $('<a>')
    .addClass('link')
    .attr('href', 'http://www.youtube.com/results.php?search_query=' + q)
    .html('<strong>YouTube trailers</strong>')
);
