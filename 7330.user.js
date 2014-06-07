// ==UserScript==
// @name           StyleGala
// @namespace      http://jonathanaquino.com
// @description    Goes directly to the page featured on a StyleGala detail page
// @include        http://www.stylegala.com/archive/*
// ==/UserScript==
window.location = document.getElementById('site').getElementsByTagName('a')[0];