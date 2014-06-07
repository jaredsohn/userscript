// ==UserScript==
// @description Adiciona uma cor de fundo ao ID dos postadores.
// @grant       none
// @include     /ch(an)?\.(info|com|net|org|tk)/
// @name        ID Rainbow
// @version     1.0.6
// ==/UserScript==

var elements = document.querySelectorAll('div > blockquote'), i, length = elements.length, parentElement, regex = /ID: ([\w]{6,8})/g;
for (i = 0; i < length; i++) {
  parentElement = elements[i].parentElement;
  parentElement.innerHTML = parentElement.innerHTML.replace(regex, 'ID: <span style="background:#$1">$1</span>');
}
