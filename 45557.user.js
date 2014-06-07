// ==UserScript==
// @name           Show link destination on hover
// @namespace      http://philwilson.org/
// @description    Shows the URL a link goes to on hover. Good when status bar is disabled
// @include        *
// @version        0.1
// ==/UserScript==


// find every link and insert a title attribute the same as the href, appending to any existing @title
(function(){

    var links = document.evaluate("//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var x=0;x<links.snapshotLength;x++) {
      link = links.snapshotItem(x);
      if (link.getAttribute("title")==null) {
          link.setAttribute("title", link.getAttribute("href"));
      } else {
          link.setAttribute("title", link.getAttribute("title")+" ("+link.getAttribute("href")+")");
      }
    }


})();