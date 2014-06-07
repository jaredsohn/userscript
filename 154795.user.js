// ==UserScript==
// @name        Rupix.org Just Image
// @namespace   rupix.org
// @description Shows just the image from rupix.org, removing everything else
// @include     http://rupix.org/viewer.php?file=*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@class="text_align_center"]/a/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);