// ==UserScript==
// @name        IADF Torrent Linker
// @namespace   dgnscripts
// @description Adds links on IAFD to popular torrent search engines for listed film and movie titles. Adds link for The Pirate Bay, Rarbg.com, and meta-search engine Torrentz.com.
// @version     1.1
// @grant       none
// @include     http://iafd.com/*
// @include     http://www.iafd.com/*
// ==/UserScript==

function torLinks(url) {
    return ' <a href="http://thepiratebay.se/s/?page=0&orderby=99&q=' + encodeURIComponent(url) + '">pby</a>\n' 
      + ' <a href="http://rarbg.com/torrents.php?search=' + encodeURIComponent(url) + '">rbg</a>\n' 
      + ' <a href="http://www.torrentz.com/search?q=' + encodeURIComponent(url) + '">trz</a>\n';
}

// filmography
$('#personal td b').each(function () {
    $(this).closest('tr').append('<td>\n' + torLinks($(this).text()) + '</td>');
});

// search results
$('a[href^="title.rme/title="]').each(function () {
    $(this).closest('dt').next('dd').append('<br><b>Torrents:</b> ' + torLinks($(this).text()));
});

// film page
var title = $('#moviedata h2').text().replace(/\s*\(\s*\d{4}\s*\)\s*$/, '');
if (title) $('#moviedata').append('<div style="clear:both;"><dt>Torrents</dt><dd>' + torLinks(title) + '</dd></div>');