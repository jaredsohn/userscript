// ==UserScript==
// @name        Pixs.ru Just Image
// @namespace   pixs.ru
// @description Shows just the image from pixs.ru, removing everything else
// @include     http://pixs.ru/showimage/*
// @version     1
// ==/UserScript==
var image = document.evaluate('//img[@id="imgg"]', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);
