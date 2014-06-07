// ==UserScript==
// @name           Add quick links to mz forum posts
// @namespace      http://pile0nades.deviantart.com/
// @description    Add quick links to mz forum posts
// @include        http://forums.mozillazine.org/viewtopic.php*
// ==/UserScript==

(function() {

  // get thumbnail titles
  var quote = get("//a[text() = '[Quote]']");


  var post = [];
  var newlinks = [];
  for(var i=0; i<quote.snapshotLength; i++) {    
    post[i] = quote.snapshotItem(i).href.split("?")[1].split("&")[1].split("=")[1];

    
    newlinks[i] = document.createElement("a");
    newlinks[i].href="http://forums.mozillazine.org/viewtopic.php?p="+post[i]+"#"+post[i];
    newlinks[i].innerHTML = "[Link]";
    
    quote.snapshotItem(i).parentNode.insertBefore(newlinks[i], quote.snapshotItem(i));
    quote.snapshotItem(i).parentNode.insertBefore(document.createTextNode(" "), quote.snapshotItem(i));
    
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