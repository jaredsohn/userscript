// ==UserScript==
// @name       xkcd.com titler
// @namespace     http://xkcd.com/
// @description    Writes out comic titles on xkcd.com
// @include    http://xkcd.com/*
// @include   http://www.xkcd.com/*
// ==/UserScript==
//
// By Ben Karel <web@eschew.org>
// edited by Aleksandr Pasechnik (to work better on my own monitor
(function() {
   var imgs = document.getElementsByTagName('img');
   var img = imgs.item(1);
   var titleText = img.getAttribute('title');
   var titleNode = document.createTextNode(titleText);
   var p = document.createElement('p');
   p.appendChild(titleNode);
   p.setAttribute('style', 'font-size: 75%; width: 735px;');
   p.setAttribute('align', 'center');
   img.parentNode.insertBefore(p, img.nextSibling.nextSibling);
})();
