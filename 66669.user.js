// ==UserScript==
// @name           Flickr groups larger image previews
// @namespace      http://not.existant
// @description    Flickr groups show medium size image previews. Requires CSS from userstyles.org, at http://userstyles.org/styles/24258
// @version        0.1
// @include       http://flickr.com/groups/*/pool/*
// @include       https://flickr.com/groups/*/pool/*
// @include       http://*.flickr.com/groups/*/pool/*
// @include       https://*.flickr.com/groups/*/pool/*
// ==/UserScript==

var allThumbs = document.getElementsByTagName('img');

for(var i=0; i < allThumbs.length; i++) {
        allThumbs[i].src = allThumbs[i].src.replace('_t.jpg','_m.jpg');
}
