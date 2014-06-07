// ==UserScript==
// @name           Add links from IMDb to NZBIndex
// @description    Script adds clickable icons to IMDb pages, linking to NZBIndex with a query for the corresponding movie/TV series.
// @namespace      https://userscripts.org/scripts/show/74703
// @updateURL      https://userscripts.org/scripts/source/74703.user.js
// @downloadURL    https://userscripts.org/scripts/source/74703.user.js
// @grant          none
// @version        2013.09.13
// @include        *imdb.com/title/*
// ==/UserScript==

var title;

title = document.querySelector('[itemprop=name]');
title = title.childNodes[0].textContent.trim();
title = title.replace(/ /g, '.'); // Scene release style
title = title.replace(/[^\w\.-_]/g, ''); // Remove non alphanumeric

// Append season
if (document.title.match(/TV Series/)) {
    title += '.S01E01.720p';
}

// Append year
else if (!document.title.match(/Video Game/)) {
    title += '.' + document.title.match(/\([0-9]{4}\)/)[0].replace(/[()]/g, '');
}

unsafeWindow.$('<a>')
    .attr('href', 'https://nzbindex.com/search/?age=&max=250&sort=agedesc&minsize=150&complete=1&rating=1&hidespam=1&q=' + encodeURIComponent(title))
    .css({ marginLeft: '.25em', position: 'relative', top: 3 })
    .append('<img src="http://www.nzbindex.nl/favicon.ico">')
    .appendTo('#pagecontent h1 span:first')
    .on('mouseenter', function(){ this.style.opacity=0.5 })
    .on('mouseleave', function(){ this.style.opacity=1 });
