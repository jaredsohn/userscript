// ==UserScript==
// @name           GlobalWarming
// @namespace      http://afterthepostrock.com/forum/
// @description    HE WAS RIGHT, THE WORLD WAS HEATING UP.
// @include        http://afterthepostrock.com/forum/*
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
  if (imgs[i].src=="http://afterthepostrock.com/forum/snow.gif")
     {
	imgs[i].style.visibility = 'hidden';
     }
}