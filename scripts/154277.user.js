// ==UserScript==
// @name        FirePic Just Image
// @namespace   FirePic
// @description Shows just the image from firepic.org
// @include     http://firepic.org/?v=*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@class="prev"]/a/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);
