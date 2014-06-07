// ==UserScript==
// @name           Rapidext
// @description    ----------------------------
// @grant          none
// @version        2013.12.04
// @include        http://*rapidmoviez.com/*
// ==/UserScript==

var title;

title = document.querySelector('[itemprop=name]');
title = title.childNodes[0].textContent.trim();
title = title.replace(/ /g, '.'); // Scene release style

// Append season
if (document.title.match(/TV Series/)) {
    title += '.S01';
}

// Append year
else if (!document.title.match(/Video Game/)) {
    title += '.' + document.title.match(/\([0-9]{4}\)/)[0].replace(/[()]/g, '');
}
unsafeWindow.$('<a>')
    .attr('href', 'https://www.google.com/search?q=watch online+' + encodeURIComponent(title))
    .css({ marginLeft: '.25em', position: 'relative', top: 3 })
    .append('<img src="http://www.czwrestling.com/archives/images/WatchOnlineIcon.png" width="21" height="21">')
    .appendTo('#pagecontent h1 span:first')
    .on('mouseenter', function(){ this.style.opacity=1 })
    .on('mouseleave', function(){ this.style.opacity=0.5 });

unsafeWindow.$('<a>')
    .attr('href', 'http://gs.indowebster.com/' + encodeURIComponent(title))
    .css({ marginLeft: '.25em', position: 'relative', top: 3 })
    .append('<img src="https://lh3.googleusercontent.com/-ei156O2SNcs/UWJZMNOcYjI/AAAAAAAAAVQ/jRvupMiVuHA/h120/twitter_normal.png" width="21" height="21">')
    .appendTo('#pagecontent h1 span:first')
    .on('mouseenter', function(){ this.style.opacity=1 })
    .on('mouseleave', function(){ this.style.opacity=0.5 });

unsafeWindow.$('<a>')
    .attr('href', 'https://www.google.com/search?q=site%3Aidfl.us+' + encodeURIComponent(title))
    .css({ marginLeft: '.25em', position: 'relative', top: 3 })
    .append('<img src="http://www.idfl.com/favicon.ico" width="21" height="21">')
    .appendTo('#pagecontent h1 span:first')
    .on('mouseenter', function(){ this.style.opacity=1 })
    .on('mouseleave', function(){ this.style.opacity=0.5 });

unsafeWindow.$('<a>')
    .attr('href', 'https://www.google.com/search?q=site%3Ashaanig.com+' + encodeURIComponent(title))
    .css({ marginLeft: '.25em', position: 'relative', top: 3 })
    .append('<img src="http://www.shaanig.com/images/misc/vbulletin4_logo.png" width="32" height="21">')
    .appendTo('#pagecontent h1 span:first')
    .on('mouseenter', function(){ this.style.opacity=1 })
    .on('mouseleave', function(){ this.style.opacity=0.5 });

unsafeWindow.$('<a>')
    .attr('href', 'https://www.google.com/search?q=site%3Akat.ph+' + encodeURIComponent(title))
    .css({ marginLeft: '.25em', position: 'relative', top: 3 })
    .append('<img src="http://kastatic.com/images/logos/kickasstorrents_500x500.png" width="32" height="32">')
    .appendTo('#pagecontent h1 span:first')
    .on('mouseenter', function(){ this.style.opacity=1 })
    .on('mouseleave', function(){ this.style.opacity=0.5 });