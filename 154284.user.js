// ==UserScript==
// @name        Pics.kz Just Image
// @namespace   Pics.kz
// @description Shows just image from pics.kz
// @include     http://pics.kz/view/*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@class="subcontainer"]//a[@class="picture"]', document, null, 9, null).singleNodeValue;
window.location.replace(image.href);