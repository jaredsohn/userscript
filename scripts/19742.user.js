// ==UserScript==
// @name           Inmagine.com Photos Watermark Remover
// @namespace      http://moishyscripts.googlepages.com
// @include        http://*inmagine.com/*
// @description    Replaces watermarked stock photos from www.inmagine.com, with non-watermarked images, and of higher resolution (width=600)
// ==/UserScript==

// Find image
var imgs = document.getElementsByTagName('img');
for(i=0;i<imgs.length;i=i+1){
  if(imgs[i].src.match(/http\:\/\/images\.inmagine\.com\/img/))
    {var img=imgs[i];}}

// Replace for larger, non-watermarked image
img.src=img.src.replace(/images.inmagine.com\/img/,'my.inmagine.com/600nwm');

// Double-clicking the image goes to image file
img.addEventListener('dblclick', function() {window.location=img.src;}, false);