// ==UserScript==
// @name        EB Nationen Remover
// @namespace   dont.really.care
// @include     http://ekstrabladet.dk/*
// @version     1
// @grant       none
// ==/UserScript==

var comments = document.getElementById('comments');
comments.parentNode.removeChild(comments);