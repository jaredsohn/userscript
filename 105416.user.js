// ==UserScript==
// @name          jiukareli
// @namespace    asd
// @description   cio nna ;D 
// @include       http://torrentsmd.com*
// ==/UserScript==
var imgs = document.getElementsByTagName('body');
for (i=0; i<imgs.length; i++)
{
imgs[i].style.visibility = 'hidden';
}