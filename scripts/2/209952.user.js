// ==UserScript==
// @name           Cookie Clicker
// @namespace      Cookie Clicker
// @include        http://orteil.dashnet.org/cookieclicker/*
// @description  https://gist.github.com/pernatiy/38bc231506b06fd85473/raw/cc.js
// ==/UserScript==


var oldOnload = window.onload;
window.onload = function () {
    oldOnload();
    var script = document.createElement('script');
    script.setAttribute('src', 'https://gist.github.com/pernatiy/38bc231506b06fd85473/raw/cc.js');
    document.body.appendChild(script);
}

