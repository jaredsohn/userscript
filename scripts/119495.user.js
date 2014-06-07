// ==UserScript==
// @name           fix free thought
// @namespace      http://*freethoughtblogs.com/*
// @description    fix the broken links to the old server
// @include        http://www.freethoughtblogs.com/pharyngula
// @include        http://www.freethoughtblogs.com/blaghag
// ==/UserScript==

var links =document.getElementsByTagName('a');
var images=document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if ((image.src.indexOf('freethoughtblogs.com/') != -1) &&
            ((image.src.indexOf('www')==-1)||(image.src.indexOf('www')>8))){
       var protocol=image.src.substring(0,image.src.indexOf('freethoughtblogs.com'));
       image.src=protocol + 'www.' + image.src.substring(image.src.indexOf('freethoughtblogs.com'));
    }
}
for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if ((a.href.indexOf('freethoughtblogs.com/') != -1)&&
            (a.href.indexOf('www')==-1)){
       var protocol=a.href.substring(0,a.href.indexOf('freethoughtblogs.com'));
       a.href=protocol + 'www.' + a.href.substring(a.href.indexOf('freethoughtblogs.com'));
    }
}
