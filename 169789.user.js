// ==UserScript==
// @name        Kosegutt Fap Opacity
// @namespace   KoseguttFapFix
// @include     http://kosegutt.net/*/
// @include     http://www.kosegutt.net/*/
// @version     1
// ==/UserScript==
var imgs=document.getElementById('photos').getElementsByTagName('img');
for(var i=0;i<imgs.length;i++){
  imgs[i].style.opacity=1;
}
