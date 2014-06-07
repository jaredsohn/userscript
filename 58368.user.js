// ==UserScript==
// @name           flikyooo
// @namespace      johnpowell
// @description    Less lame flickr logo
// @include        http://www.flickr.com/*
// @version        0.0.0.1
// ==/UserScript==

var imgs = document.getElementsByTagName('img')
imgs[1].src = "http://imgur.com/59gC6.png"
