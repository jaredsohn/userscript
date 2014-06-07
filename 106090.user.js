// ==UserScript==
// @name           Auto reload FlashGot Gallery missing images
// @namespace      Auto reload FlashGot Gallery missing images
// @include        file:///*
// ==/UserScript==

var i ;
var imgs ;

setInterval(Reload, 60000);

function Reload()  {
	var imgs = document.getElementsByTagName("img").wrappedJSObject;
      if (imgs && imgs.length) {
        for (var i = 0; i < imgs.length; ++i) {
          imgs[i].src = imgs[i].src;
        }
      }
 }