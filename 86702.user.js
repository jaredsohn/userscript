// ==UserScript==
// @name           blue google
// @namespace      google
// @description    change google homepage bg color
// @include        http://www.google.com/
// ==/UserScript==

document.body.style.background = "#0174DF";
var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
imgs[i].style.visibility = 'hidden';
}