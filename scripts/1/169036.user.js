// ==UserScript==
// @name       Google Search URL Cleaner
// @namespace  http://code-sharp.blogspot.com/
// @version    1.0
// @description  Remove redirects from Google search results
// @include      http://www.google.tld/*
// @include      https://www.google.tld/*
// @copyright  2013+, Darton Williams
// ==/UserScript==

var exec = true;

function fixLinks(){
  setTimeout(function(){
    if (document.getElementById('gbqf') == null) return;
    var r = document.getElementsByTagName('h3');
    if(exec && r.length > 0){
      for (var i = 0; i < r.length; i++) {
        var l = r[i].getElementsByTagName('a')[0];
        l.removeAttribute("onmousedown");
      }
      exec = false;
    }
  }, 500);
}

(function() {
  document.addEventListener('DOMSubtreeModified', fixLinks, false);
})();