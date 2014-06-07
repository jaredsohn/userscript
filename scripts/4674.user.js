// ==UserScript==
// @name           Access supertangas.com full size images easier
// @namespace      http://pile0nades.wordpress.com/
// @description    Access images of beautiful sexy women on supertangas.com directly, instead of in a popup window that closes when you click inside it.
// @include        http://supertangas.com/*
// @include        http://*.supertangas.com/*
// ==/UserScript==

(function() {
  var links = get("//div[@class='storycontent']/p/a/img");
  var c, i;

  for(i=0; i<links.snapshotLength; i++){
    c = links.snapshotItem(i);
    
    if(
      c.src.indexOf("/preview") &&
      c.parentNode.href.lastIndexOf("#") != -1
    ) {
      c.parentNode.href = c.parentNode.getAttribute("onClick").replace(/afoto\('(.*?)'\).*/, "$1");
      c.parentNode.removeAttribute("onclick");      
    }
  }

  // xpath function
  function get(query) {
    return document.evaluate(
      query,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  }

})();
