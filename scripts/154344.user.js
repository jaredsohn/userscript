// ==UserScript==
// @name           Radikal.ru Just Image #2
// @namespace      radikal.ru
// @include        http://radikal.ru/F/*
// @match          http://radikal.ru/F/*
// ==/UserScript==

var image = document.evaluate('//link[@rel="image_src"]', document, null, 9, null).singleNodeValue;
window.location.replace(image.href);
