// ==UserScript==
// @name           "Living With Hipstergirl And Gamergirl" comic uncensorer
// @description    Replace NSFW-gags for normal comic pictures
// @version        1.0
// @include        http://www.memecenter.com/jagodibuja/*
// ==/UserScript==

var divs = document.getElementsByClassName('content-image'); // get divs
for (var i=0; i<divs.length; i++) {
 var links = divs[i].getElementsByTagName('a')[0]; // get first link
 var num = links.href.split('/')[4]; var id = links.href.split('/')[5]; // get attributes
 var img = links.getElementsByTagName('img')[0]; // get first image
 img.src = img.src.replace(/^(.+)scdn(.+)images.+$/i,"$1global3$2"+id+"_c_"+num+".jpg"); // use attributes in replacer
}