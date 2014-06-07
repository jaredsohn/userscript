
// ==UserScript==
// @name Jerk Is Gay AF
// @namespace Jerk Likes Cock
// @description Changes your dick.
// @include      http://leak.sx*
// @include      http://*.leak.sx*
// ==/UserScript==

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('http://leak.sx/images/shitv3.svg') != -1) theImages[i].src = 'http://x.hackforums.net/images/blackreign/logo.jpg';
}