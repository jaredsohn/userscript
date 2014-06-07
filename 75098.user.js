/**
* @package: Torrentleech Ad Remover
* @authors: crazydude
* @created: April 23, 2010
* @credits: Guttorm Aase Torrentleech Adremove script
            http://userscripts.org/scripts/show/7322
*/

// ==UserScript==
// @name           Torrentleech Ad Remover
// @namespace      tlAdRemover
// @description    Removes top and bottom ad boxes from Torrentleech
// @include        http://www.torrentleech.org*
// @include        http://torrentleech.org*
// @version        1.4
// ==/UserScript==

(function() {
  function $x(p, c) {
    var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while ((i = x.iterateNext())) r.push(i);
    return r;
  }
  
  // remove the ads and the support box
  var elt = $x('.//div[@id="supportTorrentLeech"]');
  for(var i=0; i < elt.length; i++){
    elt[i].style.display = 'none';
  }
  
  // remove the annoying new logo
  var eltLogo = document.getElementById('middle');
  if (eltLogo)
    eltLogo.style.display = 'none';
  
  // remove the annoying filter popup when searching
  var eltFilters = document.getElementById('facets');
  if (eltFilters)
    eltFilters.innerHTML = "";
})();
