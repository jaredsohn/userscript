// ==UserScript==
// @name        XKCD Explained
// @namespace   http://www.explainxkcd.com/
// @description Adds a button to XKCD Explained in the navigation toolbar
// @include     http://xkcd.com/*
// @include     https://xkcd.com/*
// @grant       none
// @version     1
// ==/UserScript==
var comicNumber = parseInt(window.location.pathname.replace(/\//g,'')),
    comicNavbar = comicNavbar = document.getElementsByClassName('comicNav')[0],
    previousComicURL, comicUrl, explainNavbar;
if(!comicNumber) {
  previousComicURL = comicNavbar.children[1].firstChild.href;
  comicNumber = parseInt(previousComicURL.match('[0-9]+')) + 1;
}
comicUrl = 'http://www.explainxkcd.com/wiki/index.php?title=' + comicNumber;
explainNavbar = document.createElement('ul');

explainNavbar.className = 'comicNav';

explainNavbar.innerHTML = '<li><a target="_blank" href="' + comicUrl + '">Explanation</a></li>';
comicNavbar.parentNode.insertBefore(explainNavbar, comicNavbar);
