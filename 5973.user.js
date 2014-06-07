// ==UserScript==
// @name		RealHotGirls.com Full Images
// @author		Soheyl (soheyl637@gmail.com)
// @description	Access images of beautiful sexy women on RealHotGirlgs.com directly, instead of in a popup window that closes when you click inside it.
// @include        http://realhotgirls.com/*
// @include        http://*.realhotgirls.com/*
// ==/UserScript==

(function() {
  var links = get("//div[@class='storycontent']/p/a/img");
  var c, i;

  for(i=0; i<links.snapshotLength; i++){
    c = links.snapshotItem(i);
    
    if(
      c.src.indexOf("-PREVIEW") &&
      c.parentNode.href.lastIndexOf("#") != -1
    ) {
      c.parentNode.href = c.src.replace("-PREVIEW-", "-");
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