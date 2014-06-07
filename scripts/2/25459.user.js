// ==UserScript==
// @name           TravianImageFix
// @namespace      trav
// @include        http://*.travian.*/*
// ==/UserScript==

//setTimeout("document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/enimg/g, 'img');", 150);

var scriptTag = document.createElement('script');
scriptTag.setAttribute('language', 'JavaScript');
scriptTag.setAttribute('type', 'text/javascript');
scriptTag.innerHTML = updateImageSrc;
document.getElementsByTagName('body')[0].appendChild(scriptTag);

setTimeout("updateImageSrc();", 150);

function updateImageSrc()
{
   var imgs = document.getElementsByTagName('img');
   for(var i=0; i<imgs.length; i++)
   {
      if(imgs[i].src.indexOf('enimg') >= 0)
         imgs[i].src = imgs[i].src.replace(/enimg/g, 'img');
   }
}