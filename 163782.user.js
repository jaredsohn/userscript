// ==UserScript==
// @name           Neigh! Enabler Forum
// @namespace      gbear605
// @description    change the scratch logo to the Neigh! logo
// @include        http://scratch.mit.edu/forums/*
// @version        1.0
// ==/UserScript==
var bodyInner = document.body.innerHTML;
var replaceOne = bodyInner.replace('<a href="/">Scratch</a>', "<img src='http://i.imgur.com/Apomb.png' />");
document.body.innerHTML = replaceOne;
