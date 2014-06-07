// ==UserScript==
// @name            Liberation.fr sans pub
// @namespace       http://www.neirrek.com
// @description     Supprime les pubs Flash situÃÂ©es autour des articles du site Liberation.fr
// @include         http://www.liberation.fr/page*
// ==/UserScript==

(function() {
  var tables = document.getElementsByTagName('table');
  for (var i = 0; i < tables.length; i++) {
  	if (tables[i].getAttribute('bgcolor') == '#dddddd') {
  		tables[i].parentNode.removeChild(tables[i]);
  	}
  }
})();