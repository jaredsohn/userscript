// ==UserScript==
// @name        no more thumbnail
// @namespace   http://*/*
// @description no thumbnail image
// @version     1.1
// @grant       none
// ==/UserScript==
// supported site: 
// imgchili.net
// imgdino.com
// imgtiger.com
var imgs=document.getElementsByTagName("img"), i=0, img;

var pattern = /^http\:\/\/t(.)\.imgchili\.net\/(.*)$/;
var pattern2 = /^http\:\/\/(.*)\.imgdino\.com\/(.*)_thumb\.jpg$/;
var pattern3 = /^http\:\/\/(.*)\.imgtiger\.com\/(.*)_thumb\.jpg$/;

while (img = imgs[i++])
{
    if (img.src.match(pattern)) {
        img.src = img.src.replace(pattern, 'http://i$1.imgchili.net/$2');
    }
    else if (img.src.match(pattern2)) {
        img.src = img.src.replace(pattern2, 'http://$1.imgdino.com/$2.jpg');
    }
    else if (img.src.match(pattern3)) {
        img.src = img.src.replace(pattern3, 'http://$1.imgtiger.com/$2.jpg');
    }
}