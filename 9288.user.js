// Orkut - remove click tracker
// version 0.1 BETA
// 2007-05-16
// Copyright (c) 2007, Leandro Koiti Sato
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name           Orkut - remove click tracker
// @namespace      http://shogunbr.blogspot.com
// @description    removes click tracker from orkut search
// @include        http://www.orkut.com/UniversalSearch.aspx*
// ==/UserScript==

(function() {

  var page_links = document.links;
  for (var i=0; i<page_links.length; i++){
    if (page_links[i].href.match(/ClickTracker.aspx?.*url=.*/i)) {
      
      var new_url = unescape(page_links[i].href);
      var pos =  new_url.indexOf("url=/");
      new_url = new_url.substring(pos+5, new_url.length);

      page_links[i].href = new_url;

    }
  }

})();
