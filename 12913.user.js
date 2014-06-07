// ==UserScript==
// @name           Flickr: Sign In and Return
// @namespace      http://loucypher.wordpress.com/
// @description    Return to the page you were viewing instead of Flickr home page after signing in
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==

// Last updated: 2007-11-19

(function() {
  var login = document.evaluate("//div[@id='TopBar']//a[@href='/signin/']",
                                document, null, 9, null).singleNodeValue;

  if (login) {
    login.href = login.href + "?cf=" + document.location.pathname
                                     + escape(document.location.search);
  }
})();