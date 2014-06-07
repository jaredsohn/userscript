// ==UserScript==
// @name          Amazon Prime Search Improved Beta
// @namespace     What is this
// @description   Filters only Amazon Prime items
// @include       http://*.amazon.com/s/*
// ==/UserScript==

// first determine if we are signed in as a prime member
// by looking for logo-(on|off)-prime.gif

var imgitems, img, s;

var isPrime = false;

imgitems = document.evaluate(
               "//img[@src]",
               document,
               null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
               null);

for (var i=0; i<imgitems.snapshotLength; i++){
  img = imgitems.snapshotItem(i);
  s = img.src;
  if (s.match(new RegExp("logo-(on|off)-prime"))){
    isPrime = true;
    break;
  }
}

if (isPrime){

  // remove non-Prime items

  var searchitems, item, primeclass, text;

  searchitems = document.evaluate(
                  "//td[@class='searchitem']",
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);

  for (var i=0; i<searchitems.snapshotLength; i++){
    item = searchitems.snapshotItem(i);
    primeclass = document.evaluate(
                   "*//td[@class='primeImageWithoutRating' or \
                          @class='primeImageWithRating']",
                   item,
                   null,
                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                   null);
    if (primeclass.snapshotLength==0){
      item.parentNode.removeChild(item);
    }
  }

  // change "Showing All Results" to "Showing All Amazon Prime Eligible Results"

  searchitems = document.evaluate(
                 "//div[@id='result-count-and-sort-by']",
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);

  if (searchitems.snapshotLength!=0){
    item = searchitems.snapshotItem(0);
    primeclass = document.evaluate(
                     "*//text()",
                     item,
                     null,
                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                     null);
    for (var i=0;i<primeclass.snapshotLength;i++){
      text = primeclass.snapshotItem(i);
      if (text.data.match(new RegExp("Showing"))){
        text.data = "Showing All ";
        var b = document.createElement('b');
        b.appendChild(document.createTextNode("Amazon Prime"));
        var elig = document.createTextNode(" Eligible Results");
        text.parentNode.insertBefore(elig, text.nextSibling);
        text.parentNode.insertBefore(b, text.nextSibling);
      }
    }
  }

  // while we're at it, get rid of the sponsored links that
  // are cluttering up the search results.  We're Prime
  // members, so it's OK to do this.

  searchitems = document.evaluate(
                 "//table[@class='sponsoredLinksMain']",
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);

  for (var i=0; i<searchitems.snapshotLength; i++){
    item = searchitems.snapshotItem(i);
    item.parentNode.removeChild(item);
  }

}
