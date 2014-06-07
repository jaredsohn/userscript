// ==UserScript==
// @name        LibraryThing Amazon Smile links
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Changes the URL of LT links to Amazon to use the smile.amazon.com subdomain
// @include     http*://*librarything.tld/work/*
// @include     http*://*librarything.com/work/*
// @version     1
// @grant       none
// ==/UserScript==

var qls = document.getElementsByClassName("ql_printdisplay_line");
for (var i=0; i<qls.length; i++) {
  if (qls[i].getAttribute("bsm_code") == "500:395") {
    var amazonLink = qls[i].getElementsByTagName("a")[2];
    amazonLink.href = amazonLink.href.replace(/www\.amazon\.com/,"smile.amazon.com");
    break;
  }
}

// The MO code based on samples at http://dev.opera.com/articles/view/mutation-observers-tutorial/ by Tiffany B. Brown
var callback = function(allmutations){
  allmutations.map( function(mr){
    var overlayLinks = document.getElementsByClassName("isbndetail"); // The links around the cover images in the overlay
    if (overlayLinks.length) {
      for (var j=0; j<overlayLinks.length; j++) {
        overlayLinks[j].href = overlayLinks[j].href.replace(/www\.amazon\.com/,"smile.amazon.com");
      }
    }
  });    
},
mo = new MutationObserver(callback),
options = {
    'childList': true, 
    'subtree': true,
}
mo.observe(document.getElementsByTagName("body")[0], options);