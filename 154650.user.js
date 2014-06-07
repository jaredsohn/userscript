// ==UserScript==
// @name        Twinpix.nu Just Image
// @namespace   twinpix.nu
// @description Shows just the image from twinpix.nu
// @include     http://twinpix.nu/gallery/photo/full/?idPhoto=*
// @version     1
// ==/UserScript==

var image = document.evaluate('//div[@id="CONTENT"]/div[@id="RIGHT"]/center/img', document, null, 9, null).singleNodeValue;
window.location.replace(image.src);
