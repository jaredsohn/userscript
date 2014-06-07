// ==UserScript==
// @name           Remove 2p2 ads
// @author         pokercurious
// @description    Removes 2p2 ads sidebar (right), resizes large images
// @include        http://forums.twoplustwo.com*
// ==/UserScript==

var x = document.getElementsByTagName('td');
for (i=0; i<x.length; i++) {
  if (x[i].width == '120') {
    x[i].style.width = '0';
    x[i].style.display = 'none';    
  }
}

var y = document.getElementsByTagName('img');
for (i=0; i<y.length; i++) {
  if (y[i].width >= window.innerWidth*.65) {
    y[i].width = window.innerWidth*0.65; 
  }
}