// ==UserScript==
// @name           Neigh! Enabler Main
// @namespace      gbear605
// @description    change the scratch logo to the Neigh! logo
// @include        http://scratch.mit.edu/*
// @version        1.0
// ==/UserScript==
var bodyInner = document.body.innerHTML;
var replaceOne = bodyInner.replace('<a href="/"></a>', "<img src='http://i.imgur.com/Apomb.png' />");
document.body.innerHTML = replaceOne;
