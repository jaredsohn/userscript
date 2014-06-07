// ==UserScript==
// @name           Imgur.com to i.filmot.com converter
// @namespace      reddit
// @description    Changes imgur.com links to filmot.com
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
for (var i = 0; i < anchors.length; ++i) {
    var a = anchors[i];
    if (a.href && a.href.indexOf('http://imgur.com/') == 0) {
        a.href = a.href.replace('http://imgur.com/', 'http://i.filmot.com/');
        a.href = a.href + '.jpg';
    }
    if (a.href && a.href.indexOf('http://i.imgur.com/') == 0) {
        a.href = a.href.replace('http://i.imgur.com/', 'http://i.filmot.com/');
    }
    if (a.href && a.href.indexOf('http://www.imgur.com/') == 0) {
        a.href = a.href.replace('http://www.imgur.com/', 'http://i.filmot.com/');
    }
}
var imgs = document.getElementsByTagName('img');
for (var i = 0; i < imgs.length; ++i) {
    var img = imgs[i];
    if (img.src && img.src.indexOf('http://imgur.com/') == 0) {
        img.src = img.src.replace('http://imgur.com/', 'http://i.filmot.com/');
        img.src = img.src + '.jpg';
    }
    if (img.src && img.src.indexOf('http://i.imgur.com/') == 0) {
        img.src = img.src.replace('http://i.imgur.com/', 'http://i.filmot.com/');
    }
    if (img.src && img.src.indexOf('http://www.imgur.com/') == 0) {
        img.src = img.src.replace('http://www.imgur.com/', 'http://i.filmot.com/');
    }
}