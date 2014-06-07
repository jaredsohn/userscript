// ==UserScript==
// @name           resizeImage
// @namespace      all
// @description    resize all image
// @include        *
// ==/UserScript==
function resizeImage(){
var img=document.getElementsByTagName('img')
for (var i=0;i<img.length;i++){
	
if (img[i].width>window.innerWidth)
img[i].setAttribute('width',window.innerWidth)
}
}
window.setTimeout(function(){resizeImage();window.setInterval(function(){resizeImage()},10000)},3000)