// ==UserScript==
// @name           Fatso - Search IMDB & Wiki
// @namespace      http://userscripts.org/users/passcod
// @description    Adds a link to search for the film on IMDB
// @include        http://www.fatso.co.nz/library?mid=*
// ==/UserScript==
$ = unsafeWindow.jQuery;
$(function() {
    var text = $('.detailPageTitles').text();
    $('#md-title').append('<div style="float: right">'+
    '<a target="_blank" href="http://www.imdb.com/find?q='+text+'">Search on IMDB</a><br />'+
    '<a style="float: right" target="_blank" href="http://wikipedia.org/wiki/'+text+'">Search on Wikipedia</a>');
});
