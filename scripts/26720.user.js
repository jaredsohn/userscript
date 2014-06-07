// ==UserScript==
// @name           ifriends
// @namespace      ifriends
// @description    lkjhgfdsa
// @include        http://fanclubs.ifriends.net/*
// ==/UserScript==

extension = '_TV.WMV';
img = document.getElementsByTagName('img');
for(i=0; i<img.length; i++)
{
  if (img[i].src.indexOf('hdlocal') != -1)
  {
    src = img[i].src;
    index = src.lastIndexOf('/')
    folder = src.substring(0, index+1);
    movie = 'FCM.' + src.substring(index+1, index+11) + extension;
    img[i].parentNode.innerHTML = 
      '<a href="' + folder + movie + '"><img src="' + src + '"></a>';
  }
}