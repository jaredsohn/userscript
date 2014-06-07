// ==UserScript==
// @name Change Alpha Userbar v2
// @namespace This is for R0GUE.
// @description Changes alpha userbar!
// @include      http://leak.sx*
// @include      http://*.leak.sx*
// ==/UserScript==

var theImages = document.getElementsByTagName('img');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('http://leak.sx/images/groupimages/english/alpha_new.png') != -1) theImages[i].src = 'http://leak.sx/images/groupimages/english/Sponsor.png';