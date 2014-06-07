// ==UserScript==
// @name           imgur filmot
// @namespace      reddit, SOIS
// @description    Changes imgur.com links to filmot.com
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// @include        http://stackoverflow.com/*
// @include        http://*.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://stackexchange.com/*
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
for (var i = 0; i < anchors.length; ++i) {
    var a = anchors[i];
    if (a.href && a.href.indexOf('http://imgur.com/') == 0) {
        a.href = a.href.replace('http://imgur.com/', 'http://filmot.com/');
    }
    if (a.href && a.href.indexOf('http://i.imgur.com/') == 0) {
        a.href = a.href.replace('http://i.imgur.com/', 'http://i.filmot.com/');
    }
}
var imgs = document.getElementsByTagName('img');
for (var i = 0; i < imgs.length; ++i) {
    var img = imgs[i];
    if (img.src && img.src.indexOf('http://imgur.com/') == 0) {
        img.src = img.src.replace('http://imgur.com/', 'http://filmot.com/');
    }
    if (img.src && img.src.indexOf('http://i.imgur.com/') == 0) {
        img.src = img.src.replace('http://i.imgur.com/', 'http://i.filmot.com/');
    }
}
