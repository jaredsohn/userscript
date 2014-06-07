// ==UserScript==
// @name        Lostpic.net Just Image
// @namespace   Lostpic.net
// @description Shows just image from lostpic.net, skipping unrelated stuff
// @include     http://lostpic.net/?photo=*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@class="case"]/div[@class="centre"]/a', document, null, 9, null).singleNodeValue;
window.location.replace(image.href);
