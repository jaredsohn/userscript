// ==UserScript==
// @name        Hostingkartinok.com Just Image
// @namespace   hostingkartinok.com
// @description Shows just the image from hostingkartinok.com, skipping everything else
// @include     http://hostingkartinok.com/show-image.php?id=*
// @version     1
// ==/UserScript==

var image = document.evaluate('//a[@class="lightbox"]/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);