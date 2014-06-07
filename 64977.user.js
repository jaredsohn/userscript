// ==UserScript==
// @name           4chanNoSnow
// @namespace      http://4chan.org/
// @description    Hides the santa hat on 4chan.org
// @include        http://*.4chan.org/*
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
  if (imgs[i].src=="http://static.4chan.org/image/xmashat.gif")
     {
	imgs[i].style.visibility = 'hidden';
     }
}