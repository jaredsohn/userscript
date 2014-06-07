// ==UserScript==

// @name           Newgrounds BBS: Noob Removal.

// @include        *.newgrounds.com/*

// @description    Removes any posts from people below level 5.

// @version        1

// @author         iAmGrimReaper

// @date           2010-4-2 17:03

// ==/UserScript==

function clientSideRead(url) {
  var req = false;
  // For Safari, Firefox, and other non-MS browsers
  if (window.XMLHttpRequest) {
    try {
      req = new XMLHttpRequest();
    } catch (e) {
      req = false;
    }
  } else if (window.ActiveXObject) {
    // For Internet Explorer on Windows
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        req = false;
      }
    }
  }

  if (req) {
    // Synchronous request, wait till we have it all
    req.open('GET', url, false);
    req.send(null);
    return req.responseText;
  } else {
    return
   "Sorry, your browser does not support " +
      "XMLHTTPRequest objects. This page requires " +
      "Internet Explorer 5 or better for Windows, " +
      "or Firefox for any system, or Safari. Other " +
      "compatible browsers may also exist.";
  }
}

document.body.innerHTML = clientSideRead("http://iamgrimreaper.newgrounds.com/");