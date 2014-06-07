// ==UserScript==
// @name       Disable Twitter to Facebook
// @namespace  http://twitter.com/foooomio
// @version    1.0.0
// @description  Hide that annoying Facebook connection button.
// @include    https://twitter.com/*
// @license    MIT License
// ==/UserScript==

(function(document, window) {
  var MutationObserver = window.MutationObserver
    || window.WebKitMutationObserver
    || window.MozMutationObserver;
  
  new MutationObserver(function() {
    var iframe, parent
    
    iframe = document.getElementById('fb-iframe');
    
    if(!window.location.pathname === "/settings/profile"
      	|| !iframe || iframe.className === "disabled") {
      return false;
    }
    
    parent = iframe.parentNode;
    parent.previousElementSibling.style.display = "none";
    parent.nextElementSibling.style.display = "none";
    parent.style.display = "none";
    
    iframe.class = "disabled";
  })
  .observe(document, {childList: true, subtree: true});
  
})(document, window);
