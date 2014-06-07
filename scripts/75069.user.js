// ==UserScript==
// @name           vaynahtools
// @namespace      vaynahtools
// @include       Vaynah toolbar

// ==/UserScript==
 
  var bm_url="http://www.lamanserlo.com"
   var bm_titel="Vaynah Community LamanSerlo"
   function bookmark()
    {if (document.all)
     window.external.AddFavorite(bm_url,bm_titel)}
