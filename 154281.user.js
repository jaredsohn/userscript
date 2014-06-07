// ==UserScript==
// @name        Imageban Just Image
// @namespace   Imageban
// @description Shows just the image from imageban.ru
// @include     http://imageban.ru/show/*
// @version     1
// ==/UserScript==

var image = document.evaluate('//span[@id="imagecode"]/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);
