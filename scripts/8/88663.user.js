// ==UserScript==
// @name           Cleaner Wikia
// @namespace      clintxs@gmail.com
// @description    Removes the sidebar and the top ad space from Wikia pages. Also increases the font size to make it more readable.
// @include        http://*.wikia.com/wiki/*
// ==/UserScript==

// Remove the sidebar.
var rail = document.getElementById('WikiaRail'),
    main = document.getElementById('WikiaMainContent'),
    comments = document.getElementsByClassName('commentslikes'),
    search = document.getElementById('WikiaSearch'),
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    header = document.getElementById('WikiaPageHeader'),
    tally = document.getElementsByClassName('tally'),
    footer = document.getElementById('WikiaFooter'),
    adBar = document.getElementById('WikiaBarWrapper'),
    bottomAd = document.getElementById('WikiaArticleBottomAd'),
    topAd = document.getElementById('WikiaTopAds');

if (rail) {
    rail.style.display = 'none';
}

if (main) {
    main.style.width = '100%';
}

if (search) {
    search.style.margin = '0';
    search.style.position = 'absolute';
    search.style.top = '0';
    search.style.right = '20px';
    if (tally.length > 0) {
        tally[0].style.display = 'none';
    }
}

if (footer) {
    footer.style.display = 'none';
}

if (adBar) {
    adBar.style.display = 'none';
}

if (bottomAd) {
    bottomAd.style.display = 'none';
}

if (topAd) {
    topAd.style.display = 'none';
}

if (comments.length > 0 && search) {
    el = comments[0];
    el.innerHTML = el.innerHTML + '<li>' + search.outerHTML + '</li>';
}

header.appendChild(search);

style.appendChild(document.createTextNode('.WikiaArticle p, #mw-content-text > ul > li { font-size: 1.25em; line-height: 1.75em; font-family: Georgia; } #WikiaArticle { padding: 10px 50px; } #WikiaPageHeader details { /*width: 100%;*/ } .likes { display: none; }'));

head.appendChild(style);