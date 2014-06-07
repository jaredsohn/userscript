// ==UserScript==
// @name           Twitter - Parallax Background
// @namespace      forsureitsme@gmail.com
// @version        1.0
// @description    Parallax background for every twitter user.
// @copyright      2013, Pedro Cardoso da Silva
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

window.onscroll = function() {
    var speed = 8;
    document.body.style.backgroundPosition = (-window.pageXOffset / speed) + "px " + (-window.pageYOffset / speed) + "px";
};