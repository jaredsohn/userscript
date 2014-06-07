// ==UserScript==
// @name       Flickr Remove Yahoo Bar
// @namespace  NULL
// @version    0.3
// @description Remove yahoo bar from flickr
// @match      http://*.flickr.com/*
// @copyright  2013+, TDP
// ==/UserScript==

var css = document.createElement('style');
css.type = 'text/css';
css.innerHTML = 'body.with-eyebrow #global-nav {top: 0px;}';
document.body.appendChild(css);
var topBar = document.getElementById('yucs');
topBar.parentNode.removeChild(topBar);
