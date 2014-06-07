// ==UserScript==
// @name           Symbaloo_Google_Search_Fix
// @namespace      Symbaloo_google_search_fix
// @description    Change symbaloos adsense search to a to regular search in turn adding the Web Images Maps News Shopping Gmail links to the top of the page.
// @include        http://www.symbaloo.com*
// ==/UserScript==

document.addEventListener(
    'load', 
    function() {
    var hrefNodes = document.getElementsByName('search_form');
    for(var a = 0; a < hrefNodes.length; a++)
    {
      if(hrefNodes[a].getAttribute('action').substr(0,28) == "http://www.google.com/custom")
      {
        hrefNodes[a].setAttribute('action', "http://www.google.com/search");
      }
    }
},
true);
