// ==UserScript==
// @name           Printroom.com Save-As Script
// @namespace      *
// @description    Allows you to save the pop-up preview images from printroom.com
// @include        http://www.printroom.com/popupImage.asp?
// ==/UserScript==

window.location.href = document.getElementsByName('tmp_photo')[0].src