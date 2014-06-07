// ==UserScript==
// @name        PlugFDA
// @description Script by gficher
// @namespace   http://gficher.tk
// @include     http://plug.dj/*
// @include     http://www.plug.dj/*
// @include     https://plug.dj/*
// @include     https://www.plug.dj/*
// @version     1.2
// @grant       none
// @updateURL   https://userscripts.org/scripts/source/400521.meta.js
// ==/UserScript==

function load() {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'plugbot');
jsCode.setAttribute('src', 'https://d1rfegul30378.cloudfront.net/files/plugCubed.js'); document.body.appendChild(jsCode);
}
setTimeout(load, 7000)
