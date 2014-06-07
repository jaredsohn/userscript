// ==UserScript==
// @name           URL lengthener
// @namespace      http://phiffer.org/
// @description    Looks up shortened URLs
// @include        http://*twitter.com/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var offsite = [];
for (var i = 0; i < links.length; i++) {
  
  // Iterate over each link on the page
  
  var href = links[i].getAttribute('href');
  var parentClass = links[i].parentNode.className;
  if (href.indexOf('http://') == 0 &&               // Absolute URLs only
      href.indexOf('twitter.com') == -1 &&          // Not from Twitter.com
      parentClass.indexOf('meta') == -1) {          // Not a "from twhirl" link
    offsite.push(links[i]);
  }
}

// Test each link one at a time
testNextLink();

function testNextLink() {
  
  var link = offsite.pop();
  var url = link.getAttribute('href');
  
  // Make a HEAD request (no page data necessary) to the URL
  GM_xmlhttpRequest({
    method: 'HEAD',
    url: url,
    onload: function(rx) {
      
      // Set the HREF attribute for the link to the redirected URL
      link.setAttribute('href', rx.finalUrl);
      
      // Iterate again if there are any more offsite links
      if (offsite.length > 0) {
        testNextLink();
      }
    }
  });
}