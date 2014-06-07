// ==UserScript==
// @name Magic
// @description Makes Google+ top bar more magical
// @namespace googleplusmagic
// @include https://plus.google.com/*
// ==/UserScript==
(function () {
    var d = document.getElementsByClassName('a-U-Pg-T')[0];
    d.getElementsByTagName('img')[0].style.visibility = 'hidden';
    d.style.background = 'url(http://i55.tinypic.com/2irwv7n.gif) 0 -18px';
    d.style.height = '62px';
    d.style.width = '140px';
    d.style.marginTop = '-16px';
    d.style.backgroundSize = '100%';
}());