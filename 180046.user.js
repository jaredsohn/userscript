// ==UserScript==
// @description Adiciona links para os buscadores reversos do Google Images e do TinEye ao lado das imagens.
// @grant       none
// @include     /ch(an)?\.(info|com|net|org|tk)/
// @name        Google Images and TinEye links
// @version     0.5.4
// ==/UserScript==

var elements = document.querySelectorAll('.filesize'), href, i, length = elements.length;
for (i = 0; i < length; i++) {
  href = elements[i].getElementsByTagName('a')[0].getAttribute('href');
  elements[i].innerHTML += '\
[<a href="http://www.google.com/searchbyimage?image_url=' + href + '">Google Images</a>]\
[<a href="http://tineye.com/search?url=' + href + '">TinEye</a>]\
';
}
