// ==UserScript==
// @name        Fakku Downloading
// @namespace   http://userscripts.org/users/411522
// @description Add download links to fakku pages
// @include     http://www.fakku.net/doujinshi/*
// @include     http://www.fakku.net/manga/*
// @include     http://www.fakku.net/games/*
// @include     http://www.fakku.net/videos/*
// @grant       none
// @version     1
// ==/UserScript==

var downloadpagelink = document.createElement('a');
downloadpagelink.href = document.URL + '/download';
downloadpagelink.appendChild(document.createTextNode('download archive'));
var elmnavlinks = document.getElementById('content-navigation');
elmnavlinks.parentNode.insertBefore(downloadpagelink, elmnavlinks);