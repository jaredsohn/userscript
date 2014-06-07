// ==UserScript==
// @name           Google Logo Unannoyer
// @namespace      Awesome
// @include        http://www.google.com/
// @include        http://google.com/
// ==/UserScript==

var logo = '/images/logo.gif';
var img = document.images[0];

if(img.src == 'http://www.google.com/logos/jeffkoons.gif') {
 img.width = 276
 img.height = 110
 img.src=logo;
 img.title = 'Jeff Koons art is annoying';
 img.parentNode.href = 'http://google.com';
}

var as = document.getElementsByTagName('a');
for(var a = 0; a < as.length; a++) {
 if(as[a].href == 'http://www.google.com/help/ig/art/') {
  as[a].onmousedown = '';
  as[a].innerHTML = 'Annoyed'
 }
}