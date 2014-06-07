// ==UserScript==
// @name           Photos.com Images Watermark Remover
// @namespace      http://moishyscripts.googlepages.com
// @description    Removes watermark from stock images at Photos.com
// @include        http://*photos.com/en/search/close-up*
// ==/UserScript==

// Find image
var imgs = document.getElementsByTagName('img');
for (i=0;i<imgs.length;i++){if (imgs[i].className=='dragme'){var img=imgs[i];}}

// Get unwatermarked image location
var newsrc = img.src.replace(/thw/g,'thb');

// Replace watermarked image with non-watermarked image
img.parentNode.innerHTML = '<a href="'+newsrc+'"><img id="new_image" src="'+newsrc+'" ></a>';