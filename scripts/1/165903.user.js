// ==UserScript==
// @name FetLifePicCopy
// @version 1.0
// @by Trouble
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description [FetLife.com] Makes pictures copyable.
// @include https://fetlife.*
// @include https://*.fetlife.*
// @exclude https://fetlife.com/home/*
//  based on Fetfix 0.2 by mila7
// ==/UserScript==
var e = document.createElement('style');

document.getElementsByTagName('head')[0].appendChild(e);
if (document.URL.match(/pictures\/\d+$/)) {
  e = $('.fake_img');
  if (e.size() == 1) {
    var img = document.createElement('img');
    var url = e.css('background-image');
    img.src = url.substring(5, url.length - 2);
    img.height = e.height();
    img.width = e.width();
    var p = e.parent();
    e.remove();
    p.append(img);
  }
}
