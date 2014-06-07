// ==UserScript==
// @name           Add quick links to phpBB forum posts
// @namespace      http://pile0nades.wordpress.com/
// @description    Add quick links to phpBB forum posts
// @include        *viewtopic.php*
// ==/UserScript==

// get thumbnail titles
var quote = get("//a[contains(@href, 'mode=quote')]");
var site = location.href.substring(0, location.href.indexOf("viewtopic.php"));

var post = [];
var newlinks = [];
for(var i=0; i<quote.snapshotLength; i++) {    
  post[i] = parseInt(quote.snapshotItem(i).href.split("p=")[1]);

  newlinks[i] = document.createElement("a");
  newlinks[i].href = site + "viewtopic.php?p="+post[i]+"#"+post[i];
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

