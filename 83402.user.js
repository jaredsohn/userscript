// ==UserScript==
// @name           Last.fm User Levels
// @namespace      http://userscripts.org/users/121410
// @description    Add Last.fm User Level ( http://stas.sh/lastfm/ ) to every last.fm profile you visit.
// @version        0.1.2
// @include        http://www.last.fm/user/*
// @include        http://www.lastfm.*/user/*
// @include        http://cn.last.fm/user/*
// ==/UserScript==

var insertPoint = document.querySelector('div.rightCol h2.heading');

if(insertPoint) {
    var imgUrl   = 'http://stas.sh/lastfm/pic.php?username=';
    var link     = document.createElement('a');
    var userName = document.querySelector('meta[property="og:title"]').getAttribute('content');
    link.setAttribute('href', 'http://stas.sh/lastfm/');
    link.innerHTML = '<img src="' + imgUrl + userName + '" />'
    insertPoint.parentNode.insertBefore(link, insertPoint);
}