// ==UserScript==
// @name           Block Google 1.2
// @description    Blocks Most Popular Services
// @namespace      SSDT
// @include        http://www.google.com/
// @include        http://*.google.*/*
// @include        http://www.bing.com/*
// @include        http://*bing.*/*
// @include        http://*yahoo.*/*
// @include        http://*msn.*/*
// @include        http://*dogpile.com/*
// @include        http://*altavista.com/*
// @include        http://*ask.com/*
// ==/UserScript==

document.addEventListener('click', function(event) {

alert('You are blocked from this search!');

    event.stopPropagation();
    event.preventDefault();
}, true);