// ==UserScript==
// @name        The Pirate Bay Movie Trailers and Reviews
// @namespace   http://userscripts.org/user/arrgee
// @description Adds links to movie trailers and reviews from YouTube, IMDB and Rotten Tomatoes for the movies in the pirate bay top 100 lists.
// @include     htt*://*thepiratebay.sx/top/*
// @version     1.2
// @grant       none
// ==/UserScript==

var siteLink,
    titleNodeList,
    title,
    torrentTypeNodeList,
    torrentType,
    torrents = document.getElementsByTagName('tr'),
    sites = {YouTube: 'youtube.com', IMDB: 'imdb.com', RottenTomatoes: 'rottentomatoes.com'};

for (var i = 0; i < torrents.length; i++) {
    titleNodeList = torrents[i].getElementsByClassName('detName');
    
    if (titleNodeList.length > 0) {
        title = titleNodeList[0].textContent.toLowerCase();
        
        torrentTypeNodeList = torrents[i].getElementsByClassName('vertTh');
        torrentType = torrentTypeNodeList[0].childNodes[1].children[2].textContent;
    }
    
    if (torrentType == 'Movies') {
        title = title.replace(/\./g, '+');
        title = title.replace(/(dvd|rip|dvdrip|hdrip|brrip|br|hd|bd|cam|screener|scr|ts|r5|xvid|x264|mp4|ac3|5.1|aac|readnfo|esubs|e-sub)/g, '+');
        title = title.replace(/ /g, "+");
        title = title.replace(/(\W)-[\w]*/g, '');
        title = title.replace(/(\W)\++[\w]*/g, '');
        title = title.trim();
        
        for (var site in sites) {
            siteLink = document.createElement('a');
            siteLink.textContent = site;
            siteLink.setAttribute('href', 'https://www.google.com/#btnI=1&hl=en&safe=off&q=site:' + sites[site] + '+' + title);
            siteLink.style.color = 'green';
            siteLink.style.marginLeft = '10px';
            
            titleNodeList[0].appendChild(siteLink);
        }
    }
}