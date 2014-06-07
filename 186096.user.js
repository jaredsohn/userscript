
// ==UserScript==
// @name Convenient name for your script
// @namespace Choose whatever you want here
// @description Your description
// @include leak.sx*
// ==/UserScript==

var theImages = document.getElementsByTagName('http://leak.sx/images/groupimages/english/alpha_new.png');
for(i=0; i<theImages.length; i++) {
if(theImages[i].src.indexOf('stars_5.gif') != -1) theImages[i].src = 'http://i.imgur.com/emzPCTW.png';
}