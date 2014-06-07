// ==UserScript==
// @name        Vyhledávání filmů z ČSFD
// @namespace   http://userscripts.org/users/268703/
// @description Přidá k popisu filmu na ČS filmové databázi (www.csfd.cz) odkaz k vyhledání titulu na Movie Download (movie-download.cz). Vyhledává se podle názvu filmu.
// @include     http://www.csfd.cz/film/*
// ==/UserScript==

(function () {
  var h = document.getElementsByTagName('h1');
  var id = document.documentElement.innerHTML;
  id1 = id.indexOf('http://www.csfd.cz/film/');
	
  
 if (id)	{
 id=id.substr(id1,100);
 id2=id.indexOf('"');
 idpom=id.indexOf('film/')+5;
 id=id.substr(idpom,id2);
  
 }
  if (!h) {
    return false;
  }
  h = h[0];
  var e = document.createElement('div');
  if (id) 
  e.innerHTML = '<h4>Prejsť</h4> <span><a href="http://www.movie-download.cz/film/'+ id + '">na Movie Download.cz</a></span>';
  else
  e.innerHTML = '<h4>Vyhledat:</h4> <span><a href="http://www.movie-download.cz/vyhladavanie/q=' + h.innerHTML.trim() + id + '">na Movie Download.cz</a></span>';
  h.parentNode.appendChild(e);
})()