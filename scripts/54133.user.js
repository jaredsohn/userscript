// ==UserScript==
// @name          Display Canonical Urls
// @namespace     http://www.chrisroos.co.uk
// @description   Scans the head of the document for the first link element with a rel=canonical attribute/value and displays the value of the href attribute (the canonical url) for that element.  It will additionally link to the canonical url if it's different to the current location.  This is a rewrite of the show-canonical script linked to from this post (http://www.tripwolf.com/en/blog/2009/03/17/offtopic-canonical-a-powerful-seo-concept/).
// @include       *
// ==/UserScript==

(function() {
  var head                  = document.getElementsByTagName('head')[0];
  var linkElements          = head.getElementsByTagName('link');
  var canonicalLinkElements = [];
  
  for (var i = 0; i < linkElements.length; i++) {
    var linkElement = linkElements[i];
    /* Use a case-insensitive regex to deal with differences in the way people write 'canonical'. */
    if (/canonical/i.test(linkElement.rel)) { 
      canonicalLinkElements.push(linkElement)
    }
  }
  
  if (canonicalLinkElements.length > 0) {
    /* Use elm.href (instead of elm.getAttribute('href')) because it automatically deals with <base /> elements and absolute and relative values of the link's href attribute. */
    /* Although there could potentially be more than one link rel=canonical in the page I'm intentionally only taking the first one. */
    var canonicalUrl = canonicalLinkElements[0].href;
    
    var canonicalUrlContainer            = document.createElement('div');
    canonicalUrlContainer.style.position = 'fixed';
    canonicalUrlContainer.style.left     = '5px';
    canonicalUrlContainer.style.top      = '5px';
    canonicalUrlContainer.style.zIndex   = '999';
    canonicalUrlContainer.style.padding  = '2px';
    canonicalUrlContainer.style.font     = '9px arial';
    canonicalUrlContainer.style.border   = '1px solid';
    
    if (canonicalUrl != document.location) {
      /* Link to the Canonical Url as it's different to our current location */
      canonicalUrlContainer.style.backgroundColor = 'yellow';
      canonicalUrlContainer.style.borderColor     = 'red';
      canonicalUrlContainer.style.color           = 'blue';
      var anchor = document.createElement('a');
      anchor.href = canonicalUrl;
      anchor.style.color = 'blue';
      anchor.appendChild(document.createTextNode(canonicalUrl));
      canonicalUrlContainer.appendChild(anchor);
    } else {
      /* Display the Canonical Url as it's the same as our current location */
      canonicalUrlContainer.style.backgroundColor = 'lightyellow';
      canonicalUrlContainer.style.borderColor     = 'gray';
      canonicalUrlContainer.style.color           = 'black';
      canonicalUrlContainer.appendChild(document.createTextNode(canonicalUrl));
    }
    
    document.body.appendChild(canonicalUrlContainer);
  }
})()