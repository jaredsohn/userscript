// ==UserScript==
// @name        Remove lj-promo
// @description        Remove livejournal's promo. Удаляет промо-блоки с заглавной страницы, страниц постов, удаляет промо-посты из френд-ленты.
// @namespace   http://users.livejournal.com/_zerkalo_/
// @include       http://livejournal.com/
// @include       http://*.livejournal.com/
// @include       http://*.livejournal.com/*
// @version     1.1
// @grant     none
// ==/UserScript==



var wrapper = document.getElementsByClassName("appwidget appwidget-homepage-selfpromo");
for (var i=0; i<wrapper.length; i++){
    wrapper[i].style.display = "none";
};

var wrapper = document.getElementsByClassName("appwidget appwidget-homepage-commpromo");
for (var i=0; i<wrapper.length; i++){
    wrapper[i].style.display = "none";
};

var wrapper = document.getElementsByClassName("appwidget appwidget-journalpromo");
for (var i=0; i<wrapper.length; i++){
    wrapper[i].style.display = "none";
};

var wrapper = document.getElementsByClassName("b-item-type-ad i-friendsfeed-ad-close");
for (var i=0; i<wrapper.length; i++){
    wrapper[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
};
