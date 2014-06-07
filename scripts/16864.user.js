// ==UserScript==
// @name           redtube main
// @namespace      
// @description    Remove the redtube iframe ads
// @version        0.0.1
// @include        http://www.redtube.com/*

// ==/UserScript==

(function()
{  

  var things;

  // hide all iframe
  things = document.getElementsByTagName("iframe");
  for (var i=0; i<things.length; i++) {
    try {
      things[i].style.display = "none";
    }
    catch(e) {
    }
  }


})();
