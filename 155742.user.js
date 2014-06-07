// ==UserScript==
// @name		Basic Image replacement (WIP)
// @author		pixeljosh
// @description		Changes 1 image
// @include		http://*
// @include		https://*
// @version		1
// ==/UserScript==
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://25.media.tumblr.com/avatar_03c8a9bfcfaa_64.png") {
         ilist[i].src = "http://25.media.tumblr.com/avatar_1797788bb483_64.png";
    }
}