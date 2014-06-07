// ==UserScript==
// @name        Vyhledávání filmů z ČSFD
// @namespace   http://userscripts.org/users/268703/
// @description Přidá k popisu filmu na ČS filmové databázi (www.csfd.cz) odkaz k vyhledání titulu na Movie Library (movie-library.cz). Vyhledává se podle názvu filmu.
// @include     http://www.csfd.cz/film/*
// ==/UserScript==

(function () {
  var h = document.getElementsByTagName('h1');
  if (!h) {
    return false;
  }
  h = h[0];
  var e = document.createElement('div');
  e.innerHTML = '<h4>Vyhledat:</h4> <span><a href="http://movie-library.cz/search.php?q=' + h.innerHTML.trim() + '">na Movie Library.cz</a></span>';
  h.parentNode.appendChild(e);
})()
