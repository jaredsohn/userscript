// ==UserScript==
// @name       Personality Cafe Image Fixer
// @version    0.1
// @description  Fixes some images on personalitycafe
// @include    http://personalitycafe.*
// ==/UserScript==

var tags = document.getElementsByTagName('img');

for (var i = 0; i < tags.length; i++) {
  tags[i].src = tags[i].src.replace("image4", "images");
  tags[i].src = tags[i].src.replace("image1", "images");
}