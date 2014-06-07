// ==UserScript==
// @name          Startpagina - do not open in new window
// @namespace     http://www.mozbrowser.nl/userscripts
// @description	  Verwijdert OnClick uit startpagina's om ongewenste nieuwe vensters te voorkomen.
// @include       http://*.pagina.nl/*
// @include       http://www.startpagina.nl/*
// @include       http://startpagina.nl/*
// ==/UserScript==

(function() {
  var links = document.getElementsByTagName('a');
  var i;
  for (i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.hasAttribute('onClick')) {
      link.removeAttribute('onClick');
    }
  }
})();