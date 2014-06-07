// ==UserScript==
// @name           Google IG Suggest
// @namespace      http://myjavaserver.com/~ksenji
// @description    Google Suggest for Google IG
// @include        http://www.google.com/ig*
// @include        http://google.com/ig*
// ==/UserScript==


(function() {
  var suggestJS = document.createElement("script");
  suggestJS.setAttribute("src", "http://www.google.com/ac.js");
  document.body.appendChild(suggestJS);
  window.addEventListener("load", 
    function() {
      var f = unsafeWindow.document.f;
      unsafeWindow.InstallAC(f, f.q, f.btnG,"search","en");
    }, 
  false);
})();
