// ==UserScript==
// @name        You-logo.ru Just Image
// @namespace   You-logo
// @description Shows just the image from you-logo.ru
// @include     http://you-logo.ru/show-image.php?id=*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@class="content-container"]/center/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);
