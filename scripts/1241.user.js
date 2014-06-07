// ==UserScript==
// @name          Citeseer Retry
// @namespace     http://www.iki.fi/jks/
// @description	  Adds a direct link if Citeseer's redirector is too busy
// @include       http://citeseer.ist.psu.edu/rd/*
// ==/UserScript==

// For some reason, Citeseer reroutes all external links to papers via a
// redirector script.  Their server is occasionally too busy to even send
// back the redirected URL.  Perhaps it doesn't allow too much simultaneous
// usage from one address, and the university proxy I'm behind probably has
// lots of Citeseer users.  I've edited the link by hand a lot of times;
// this script automates the operation.

(function() {

  links = document.getElementsByTagName("a");
  for (i=0; i < links.length; i++) {
    var link = links[i];
    if (!link.innerHTML || !link.href || link.innerHTML.indexOf("here") == -1) {
      continue;
    }
    var idx = link.href.indexOf("Download/");
    if (idx < 0) {
      continue;
    }

    var ourlink;
    ourlink = link.href.substr(idx + 9);
    // Citeseer replaces slashes by the string "qSq". It does not
    // replace single occurrences of the letter "q" with anything; it
    // is a mystery what happens if a URL really includes the
    // substring "qSq".
    ourlink = ourlink.replace(/qSq/g, '/');
    ourlink = ourlink.replace(/%3A/g, ':');

    var span = document.createElement("span");
    span.appendChild(document.createElement("br"));
    span.appendChild(document.createTextNode(" Or see the "));
    var a = document.createElement("a");
    a.href = ourlink;
    a.appendChild(document.createTextNode("original file"));
    span.appendChild(a);
    span.appendChild(document.createTextNode("."));
    link.parentNode.appendChild(span);

    break;
  }
 })();
