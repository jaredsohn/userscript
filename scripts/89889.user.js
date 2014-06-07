// ==UserScript==
// @name          HUNT Imge Alert
// @namespace      http://userscripts.org/users/75950
// @description    Alerts For Images
// @include        http://pokefarm.org/*
// ==/UserScript==
// list of images
var theImages = document.getElementsByTagName('img');

var theList = ['http://static.pokefarm.org/_img/eggs/001.png', 'http://static.pokefarm.org/_img/eggs/004.png', 'http://static.pokefarm.org/_img/eggs/007.png', ];

for(i=0; i<theImages.length; i++) {
   for(j=0; j<theList.length; j++) {
      if(theImages[i].src==theList[j]) alert(theList[j]+' found on this page');
   }
}