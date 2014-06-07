// ==UserScript==
// @name           Metacritic Movies: NZB Search
// @namespace      http://userscripts.org/scripts/show/108639
// @description    Adds links to Metacritic Movie pages, to search NZB sites such as NZBMatrix and NZBs.org
// @include        http://www.metacritic.com/movie/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @date           2011-07-30
// @creator        Arun S.
// ==/UserScript==
// 


var url = 'http://nzbmatrix.com/nzb-search.php?cat=2&search=';
var url2 = 'http://nzbs.org/index.php?action=search&catid=2&q=';


$.each($('div'),function() {
    if (! $(this).attr('class').match(/product_title/)) return;
    var a = $(this).children('a');
    a = $(a)[$(a).length-1];
    var title = $($(this).children('a')[0]).contents()[0].textContent;
    $(this).after('<br><a href="'+ url + encodeURI(title) +'"><span class="smallText">Search NZBMatrix</span></a><span class="smallText"> | </span><a href="'+ url2 + encodeURI(title) +'"><span class="smallText">Search NZBs.org</span></a><br><br>');
});
