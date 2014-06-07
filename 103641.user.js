// ==UserScript==
// @name           Sex141圖片放大器
// @version		26/05/2011
// @namespace      Golden Brother
// @description    自動放大所有圖片，提升叫雞效率。
// @icon		http://i.imgur.com/h9IhB.jpg
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include        http://*sex141.com/*/
// @include        http://*sex141.com/*/*region-*.html
// @include        http://*sex141.com/*/main.php
// @include        http://*sex141.com/*/*gal-*.html?building=*&region=*
// @include        http://*sex141.com/*/*gal-*.html
// @include        http://*sex141.com/*/*girl-*.html
// @include        http://*sex141.com/*/*-girls.html?page=*
// @include        http://*sex141.com/*/*gals.html?page=*
// @include        http://*sex141.com/*/*building-*.html?region=*
// ==/UserScript==

$('img[src*="photoasia"]:not([src*="gif"]):not([src*="png"]').each(function(index, item) {
    var s = $(item).attr('src');
    s = s.replace(/picprofile/g ,"middle");
    s = s.replace(/small/g ,"main");
    s = s.replace(/width=\"48\"/g,"width=\"222\"");
    s = s.replace(/height=\"64\"/g,"height=\"296\"");
    s = s.replace(/height=\"180\" width=\"135\"/g,"height=\"640\" width=\"480\"");
    s = s.replace(/mapmain/g,"mapbig");
    $(item).attr('src', s);
});