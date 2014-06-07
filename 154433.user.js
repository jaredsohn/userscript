// ==UserScript==
// @name        Imageshost Just Image
// @namespace   Imageshost.ru
// @description Shows just the image from imageshost.ru
// @include     http://imageshost.ru/photo/*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@class="predpr"]/div[@id="bphoto"]/a/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);
