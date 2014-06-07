// ==UserScript==
// @name           Show big pictures from http://www.thumbs-up.net/ instead of thumbs directly
// @namespace      http://www.andronus.com/
// @description    Show direcly all thumb pictures but in big :) 
// @include        http://www.thumbs-up.net/*
// @include        http://*.thumbs-up.net/*
// @creator     Rico loves Pipo <greaseporn @ andronus . com>
// @version     1.0
// @date        2007-06-25
// ==/UserScript==

(function() {
  var links = get("//a/img");
  var im, i;

  for(i=0; i<links.snapshotLength; i++){
    im = links.snapshotItem(i);
//    alert(im.src+" XXX "+im.parentNode.href);
    if(im.src.indexOf("/javascript:self.parent.viewpic")) {
//	if(i>5 && i<10)alert(im.parentNode.href);
      im.src = im.parentNode.href.replace(/javascript\:self\.parent\.viewpic\(\'([^\']*)\'\,\'.*/, "$1");
	im.removeAttribute("width");
	im.removeAttribute("height");
//	if (i>5 && i<10) alert(im.src);

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
