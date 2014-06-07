// ==UserScript==
// @name        ShowRSS --> torrentz.eu search
// @namespace   userscript.danielrozenberg.com
// @description Creates a link to search for 
// @include     http://showrss.info/*
// @include     https://showrss.info/*
// @version     1.0.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var ENTRY_TEXT_REGEXP = /^(.+) (\d+)x(\d+).*$/;
    
    $('head').append('<style type="text/css">' +
                       'div.torrentz { display: inline; margin-left: 2em; color: silver; }' +
                       'div.torrentz span::after { content: ":" }' +
                       'div.torrentz a { margin-left: 0.5em; color: silver; text-decoration: underline; }' +
                       'div.torrentz a:hover { color: gray; }' +
                     '</style>');
    
    $('div.showentry').each(function() {
        var entry = $('a:not([class^="checkbox_"])', this).text().match(ENTRY_TEXT_REGEXP);
        var filteredClass = $('a', this).hasClass('filtered') ? 'filtered' : 'unfiltered';
        
        var title = entry[1];
        var season = parseInt(entry[2]);
        season = ((season < 10) ? '0' : '') + season;
        var episode = 's' + season + 'e' + entry[3];
        
        $(this).append('<div class="torrentz ' + filteredClass + '">' +
                         '<span>Search Torrentz</span>' +
                         '<a href="https://torrentz.eu/search?q=' + encodeURIComponent(title + ' ' + episode + ' 1080p') + '">1080p</a>' +
                         '<a href="https://torrentz.eu/search?q=' + encodeURIComponent(title + ' ' + episode + ' 720p') + '">720p</a>' +
                         '<a href="https://torrentz.eu/search?q=' + encodeURIComponent(title + ' ' + episode) + '">SD</a>' +
                       '</div>');
    });
});
