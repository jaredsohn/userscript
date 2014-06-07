// ==UserScript==
// @description Melhora a funcionalidade "Resposta Rápida".
// @grant       none
// @include     /ch(an)?\.(info|com|net|org|tk)/
// @name        Better Quick Reply
// @version     0.5.6
// ==/UserScript==

if (document.querySelectorAll('.replymode').length === 0) {
  var element, elements = document.querySelectorAll('.reflink > a + a'), i, length = elements.length;
  for (i = 0; i < length; i++) {
    element = elements[i];
    element.setAttribute('onclick', "quickreply('" + element.getAttribute('href').match(/\/([\d]+)\./)[1] + "');" + element.getAttribute('onclick'));
  }
}
