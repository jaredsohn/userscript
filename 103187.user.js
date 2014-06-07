// ==UserScript==
// @name          Hello world
// @namespace     Sephy.greenerizer
// @description   Script test
// @include        http://*.kingdomofloathing.com/*
// @version       1.0
// ==/UserScript==

window.helloworld = function() {
    alert('Hello world!');
}

window.setTimeout("helloworld()", 1000);