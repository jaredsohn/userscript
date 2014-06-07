// ==UserScript==
// @name Uncensor 4chan
// @include *.4chan.org/*
// ==/UserScript==


function addScript(src) {
var head = document.getElementsByTagName('HEAD').item(0);
var script = document.createElement("script");
script.type = "text/javascript";
script.src=src;
head.appendChild(script);
}

addScript('http://bees.x10.mx/uncensor-4chan.js');
